"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { site } from "@/lib/site";
import { Honeypot, Spinner, SuccessMark, TextArea, TextField } from "./Fields";
import {
  addDays,
  addMonths,
  daysInMonth,
  firstAvailableKey,
  formatDay,
  formatMonth,
  lastBookableKey,
  monthIndex,
  monthOf,
  parseKey,
  shiftMonth,
  slotsFor,
  toKey,
  todayKey,
  weekdayOf,
  type DayKey,
  type Month,
} from "./dates";
import { submitContact, validateMeeting } from "./validation";
import form from "./Form.module.css";
import styles from "./Booking.module.css";

/* Current time, rounded to the minute. 0 on the server / before hydration. */
const subscribeNow = (cb: () => void) => {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
};
const getNow = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerNow = () => 0;

const WEEKDAYS = [
  ["S", "Sunday"],
  ["M", "Monday"],
  ["T", "Tuesday"],
  ["W", "Wednesday"],
  ["T", "Thursday"],
  ["F", "Friday"],
  ["S", "Saturday"],
] as const;

type Details = { name: string; email: string; storeUrl: string; notes: string };
type Status = "idle" | "sending" | "success" | "error" | "unavailable";

function visitorZone() {
  try {
    const id = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const long = new Intl.DateTimeFormat("en-US", { timeZoneName: "long" }).formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value;
    return { id, label: long && id ? `${long} (${id.replace(/_/g, " ")})` : long || id || "your local time" };
  } catch {
    return { id: "", label: "your local time" };
  }
}

const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const localDayFmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
const fullFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });

function bookingHost(url: string) {
  if (/calendly\.com/i.test(url)) return "Calendly";
  if (/cal\.com/i.test(url)) return "Cal.com";
  return null;
}

/** 30-minute meeting request: accessible calendar → time slot (visitor's zone) → details → confirmation. */
export function BookingWidget({ bookingUrl }: { bookingUrl?: string }) {
  const now = useSyncExternalStore(subscribeNow, getNow, getServerNow);
  const ready = now > 0;

  const [picked, setPicked] = useState<DayKey | null>(null);
  const [view, setView] = useState<Month | null>(null);
  const [focusKey, setFocusKey] = useState<DayKey | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [details, setDetails] = useState<Details>({ name: "", email: "", storeUrl: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const [focusReq, setFocusReq] = useState<{ to: "invalid" | "slot" | "status" | "success"; n: number } | null>(null);
  const requestFocus = (to: "invalid" | "slot" | "status" | "success") => setFocusReq((r) => ({ to, n: (r?.n ?? 0) + 1 }));

  const gridRef = useRef<HTMLTableSectionElement>(null);
  const slotsRef = useRef<HTMLUListElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Keyboard navigation bumps gridFocusReq so the effect below moves DOM focus; dir drives the month slide.
  const [gridFocusReq, setGridFocusReq] = useState(0);
  const [dir, setDir] = useState(0);

  const zone = useMemo(() => (ready ? visitorZone() : { id: "", label: "your local time" }), [ready]);
  const today = ready ? todayKey(now) : "";
  const last = ready ? lastBookableKey(now) : "";
  const firstOpen = useMemo(() => (ready ? firstAvailableKey(now) : null), [ready, now]);

  const selected = picked ?? firstOpen;
  const viewMonth = view ?? (selected ? monthOf(selected) : ready ? monthOf(today) : { y: 2026, m: 0 });
  const minMonth = ready ? monthOf(today) : viewMonth;
  const maxMonth = ready ? monthOf(last) : viewMonth;
  const daySlots = useMemo(() => (selected && ready ? slotsFor(selected, now) : []), [selected, ready, now]);
  const isOpen = (k: DayKey) => ready && k >= today && k <= last && slotsFor(k, now).length > 0;
  const activeKey = focusKey && monthIndex(monthOf(focusKey)) === monthIndex(viewMonth) ? focusKey : null;
  const tabKey =
    activeKey ??
    (selected && monthIndex(monthOf(selected)) === monthIndex(viewMonth) ? selected : null) ??
    toKey(viewMonth.y, viewMonth.m, 1);
  const chosenSlot = slot !== null && daySlots.includes(slot) ? slot : null;

  // Move DOM focus after keyboard navigation inside the grid (possibly across months).
  useEffect(() => {
    if (!gridFocusReq || !focusKey) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-key="${focusKey}"]`)?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only after a keyboard move
  }, [gridFocusReq]);

  // Apply focus requested by submit once the DOM reflects the new state.
  useEffect(() => {
    if (!focusReq) return;
    if (focusReq.to === "success") successRef.current?.focus();
    else if (focusReq.to === "status") statusRef.current?.focus();
    else if (focusReq.to === "slot")
      (
        slotsRef.current?.querySelector<HTMLInputElement>("input") ?? gridRef.current?.querySelector<HTMLButtonElement>("[tabindex='0']")
      )?.focus();
    else formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [focusReq]);

  // Month change: days slide in from the travel direction.
  useGSAP(
    () => {
      if (!ready || !dir || prefersReducedMotion()) return;
      gsap.fromTo(gridRef.current, { x: dir * 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
    },
    { dependencies: [viewMonth.y, viewMonth.m], scope: gridRef },
  );

  // New day: slots cascade in.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion() || !slotsRef.current) return;
      gsap.fromTo(slotsRef.current.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.045, ease: "expo.out" });
    },
    { dependencies: [selected, ready] },
  );

  const goMonth = (n: number) => {
    const target = addMonths(viewMonth, n);
    if (monthIndex(target) < monthIndex(minMonth) || monthIndex(target) > monthIndex(maxMonth)) return;
    setDir(n);
    setView(target);
    setFocusKey(null);
  };

  const choose = (k: DayKey) => {
    if (!isOpen(k)) return;
    setPicked(k);
    setFocusKey(k);
    setSlot(null);
    setErrors((e) => ({ ...e, datetime: "" }));
  };

  const onGridKey = (e: KeyboardEvent<HTMLButtonElement>, k: DayKey) => {
    const wd = weekdayOf(k);
    const moves: Record<string, () => DayKey> = {
      ArrowLeft: () => addDays(k, -1),
      ArrowRight: () => addDays(k, 1),
      ArrowUp: () => addDays(k, -7),
      ArrowDown: () => addDays(k, 7),
      Home: () => addDays(k, -wd),
      End: () => addDays(k, 6 - wd),
      PageUp: () => shiftMonth(k, -1),
      PageDown: () => shiftMonth(k, 1),
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    let next = move();
    const lo = toKey(minMonth.y, minMonth.m, 1);
    const hi = toKey(maxMonth.y, maxMonth.m, daysInMonth(maxMonth));
    if (next < lo) next = lo;
    if (next > hi) next = hi;
    const nm = monthOf(next);
    if (monthIndex(nm) !== monthIndex(viewMonth)) {
      setDir(monthIndex(nm) > monthIndex(viewMonth) ? 1 : -1);
      setView(nm);
    }
    setFocusKey(next);
    setGridFocusReq((n) => n + 1);
  };

  const updateDetail = (field: keyof Details, value: string) => {
    const next = { ...details, [field]: value };
    setDetails(next);
    if (errors[field]) {
      const { errors: all } = validateMeeting({ ...next, datetime: chosenSlot ? new Date(chosenSlot).toISOString() : "" }, now);
      setErrors((e) => ({ ...e, [field]: all[field] ?? "" }));
    }
  };

  const blurDetail = (field: keyof Details) => {
    const { errors: all } = validateMeeting({ ...details, datetime: "" }, now);
    setErrors((e) => ({ ...e, [field]: all[field] ?? "" }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const iso = chosenSlot ? new Date(chosenSlot).toISOString() : "";
    const { errors: all } = validateMeeting({ ...details, datetime: iso, timeZone: zone.id }, now);
    setErrors(all);
    if (all.datetime) {
      requestFocus("slot");
      return;
    }
    if (Object.keys(all).length) {
      requestFocus("invalid");
      return;
    }
    setStatus("sending");
    setMessage("");
    const res = await submitContact({ type: "meeting", ...details, datetime: iso, timeZone: zone.id, botcheck: trap });
    if (res.ok) {
      setStatus("success");
      setMessage(res.message ?? "");
      requestFocus("success");
      return;
    }
    if (res.errors && Object.keys(res.errors).length) {
      setErrors(res.errors);
      setStatus("idle");
      requestFocus(res.errors.datetime ? "slot" : "invalid");
      return;
    }
    setStatus(res.status === 503 ? "unavailable" : "error");
    setMessage(res.message ?? "Something went wrong. Please try again.");
    requestFocus("status");
  };

  const whenText = chosenSlot ? fullFmt.format(chosenSlot) : "";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Meeting request (30 min)")}&body=${encodeURIComponent(
    [`Preferred time: ${whenText || "to be agreed"}`, `Name: ${details.name}`, details.storeUrl && `Store: ${details.storeUrl}`, details.notes && `\n${details.notes}`]
      .filter(Boolean)
      .join("\n"),
  )}`;
  const host = bookingUrl ? bookingHost(bookingUrl) : null;

  if (status === "success") {
    return (
      <div className={form.card}>
        <div className={form.success} role="status">
          <SuccessMark />
          <h2 ref={successRef} tabIndex={-1} className={form.successTitle}>
            Request received, {details.name.split(" ")[0]}!
          </h2>
          <p className={form.successText}>
            You asked for <strong>{whenText}</strong>. {message || "We'll confirm by email with a meeting link."} Keep an eye on{" "}
            <strong>{details.email}</strong>.
          </p>
          <div className={form.successActions}>
            <Button href="/#work" className={form.submit}>
              Explore our work
            </Button>
            <button
              type="button"
              className={form.linkBtn}
              onClick={() => {
                setStatus("idle");
                setSlot(null);
              }}
            >
              Request another time
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Leading blanks so day 1 lands under its weekday (Sunday-first, as in the design).
  const lead = weekdayOf(toKey(viewMonth.y, viewMonth.m, 1));
  const total = daysInMonth(viewMonth);
  const cells: (DayKey | null)[] = [...Array<null>(lead).fill(null), ...Array.from({ length: total }, (_, i) => toKey(viewMonth.y, viewMonth.m, i + 1))];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  const monthLabelId = "booking-month";
  const sending = status === "sending";

  return (
    <div className={styles.stack}>
      <section className={`${form.card} ${styles.booking}`} aria-labelledby="booking-title">
        <div className={styles.calCol}>
          <h2 id="booking-title" className={form.cardTitle}>
            Select a date &amp; time
          </h2>
          <p className={styles.zone}>{ready ? `Times shown in ${zone.label}` : "Loading your time zone…"}</p>

          <div className={styles.monthBar}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => goMonth(-1)}
              disabled={!ready || monthIndex(viewMonth) <= monthIndex(minMonth)}
              aria-label="Previous month"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
                <path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p id={monthLabelId} className={styles.month} aria-live="polite">
              {ready ? formatMonth(viewMonth) : " "}
            </p>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => goMonth(1)}
              disabled={!ready || monthIndex(viewMonth) >= monthIndex(maxMonth)}
              aria-label="Next month"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
                <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <table className={styles.grid} role="grid" aria-labelledby={monthLabelId} aria-describedby="booking-help">
            <thead>
              <tr>
                {WEEKDAYS.map(([short, long]) => (
                  <th key={long} scope="col" abbr={long} className={styles.dow}>
                    <span aria-hidden="true">{short}</span>
                    <span className="sr-only">{long}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={gridRef}>
              {ready
                ? weeks.map((week, w) => (
                    <tr key={w}>
                      {week.map((k, i) => {
                        if (!k) return <td key={`b${i}`} className={styles.cell} />;
                        const open = isOpen(k);
                        const isSel = k === selected;
                        return (
                          <td key={k} role="gridcell" aria-selected={isSel} className={styles.cell}>
                            <button
                              type="button"
                              data-key={k}
                              className={styles.day}
                              data-open={open || undefined}
                              data-selected={isSel || undefined}
                              data-today={k === today || undefined}
                              tabIndex={k === tabKey ? 0 : -1}
                              aria-disabled={!open || undefined}
                              aria-label={`${formatDay(k, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}${
                                open ? "" : ", unavailable"
                              }${k === today ? ", today" : ""}`}
                              onClick={() => choose(k)}
                              onKeyDown={(e) => onGridKey(e, k)}
                              onFocus={() => setFocusKey(k)}
                            >
                              {parseKey(k).d}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))
                : Array.from({ length: 5 }, (_, w) => (
                    <tr key={w} aria-hidden="true">
                      {Array.from({ length: 7 }, (_, i) => (
                        <td key={i} className={styles.cell}>
                          <span className={`${styles.day} ${styles.ghost}`} />
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          <p id="booking-help" className="sr-only">
            Use the arrow keys to move between days, Page Up and Page Down to change month, and Enter to choose a day. Weekends
            and past dates are unavailable.
          </p>
        </div>

        <div className={styles.slotCol}>
          <fieldset className={form.fieldset} aria-describedby={errors.datetime ? "slot-error" : undefined}>
            <legend className={styles.slotDay}>{selected ? formatDay(selected, { weekday: "long", month: "short", day: "numeric" }) : "Pick a day"}</legend>
            {ready && daySlots.length > 0 ? (
              <ul role="list" ref={slotsRef} className={styles.slots}>
                {daySlots.map((t) => {
                  const localDay = localDayFmt.format(t);
                  const officeDay = selected ? formatDay(selected, { weekday: "short", month: "short", day: "numeric" }) : localDay;
                  return (
                    <li key={t}>
                      <label className={styles.slot}>
                        <input
                          type="radio"
                          name="slot"
                          value={new Date(t).toISOString()}
                          checked={chosenSlot === t}
                          onChange={() => {
                            setSlot(t);
                            setErrors((e) => ({ ...e, datetime: "" }));
                          }}
                        />
                        <span className={styles.slotTime}>{timeFmt.format(t)}</span>
                        {localDay !== officeDay && <span className={styles.slotNote}>{localDay}</span>}
                      </label>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={styles.empty}>{ready ? "No times left on this day. Please pick another date." : "Loading available times…"}</p>
            )}
          </fieldset>
          {errors.datetime && (
            <p id="slot-error" className={form.error} role="alert">
              {errors.datetime}
            </p>
          )}
        </div>
      </section>

      <form ref={formRef} className={form.card} onSubmit={onSubmit} noValidate aria-labelledby="details-title" aria-busy={sending || undefined}>
        <h2 id="details-title" className={form.cardTitle}>
          Your details
        </h2>
        <div className={`${form.grid} ${styles.detailsGrid}`}>
          <TextField
            id="meeting-name"
            name="name"
            label="Your name"
            required
            autoComplete="name"
            placeholder="Full name"
            value={details.name}
            error={errors.name || undefined}
            onChange={(e) => updateDetail("name", e.target.value)}
            onBlur={() => blurDetail("name")}
          />
          <TextField
            id="meeting-email"
            name="email"
            type="email"
            inputMode="email"
            label="Email"
            required
            autoComplete="email"
            placeholder="you@yourstore.com"
            value={details.email}
            error={errors.email || undefined}
            onChange={(e) => updateDetail("email", e.target.value)}
            onBlur={() => blurDetail("email")}
          />
          <TextField
            id="meeting-store"
            name="storeUrl"
            type="url"
            inputMode="url"
            label="Store URL"
            className={form.full}
            autoComplete="url"
            placeholder="https://"
            value={details.storeUrl}
            error={errors.storeUrl || undefined}
            onChange={(e) => updateDetail("storeUrl", e.target.value)}
            onBlur={() => blurDetail("storeUrl")}
          />
          <TextArea
            id="meeting-notes"
            name="notes"
            label="Anything we should know?"
            className={form.full}
            placeholder="Optional notes…"
            rows={3}
            value={details.notes}
            error={errors.notes || undefined}
            onChange={(e) => updateDetail("notes", e.target.value)}
          />
          <Honeypot value={trap} onChange={setTrap} />

          {(status === "error" || status === "unavailable") && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className={`${form.status} ${form.full} ${status === "error" ? form.statusError : form.statusInfo}`}
            >
              <p>
                {status === "unavailable" ? (
                  <>
                    Online booking is taking a break. <a href={mailto}>Email {site.email}</a> with your preferred time
                    {whenText ? ` (${whenText})` : ""} and we&apos;ll confirm within one business day.
                  </>
                ) : (
                  <>
                    {message} You can also email <a href={mailto}>{site.email}</a>.
                  </>
                )}
              </p>
            </div>
          )}

          <div className={`${form.actions} ${form.full}`}>
            <Button type="submit" className={form.submit} disabled={sending} aria-busy={sending}>
              {sending ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                "Confirm Meeting"
              )}
            </Button>
            <p className={form.note} aria-live="polite">
              {chosenSlot ? <>Selected: {whenText}</> : "Choose a date and time above."}
            </p>
          </div>
        </div>
      </form>

      {bookingUrl && (
        <p className={styles.external}>
          {host ? `Prefer ${host}?` : "Prefer our scheduling page?"}{" "}
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book there instead<span className="sr-only"> (opens in a new tab)</span>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          </a>
        </p>
      )}
    </div>
  );
}
