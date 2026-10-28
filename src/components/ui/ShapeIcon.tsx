/** The four abstract marks used on the service cards (Figma "Shopify Services" grid). */
export type Shape = "pinwheel" | "petals" | "cross" | "brackets";


export function ShapeIcon({ shape, className }: { shape: Shape; className?: string }) {
  const common = { className, width: 84, height: 84, viewBox: "0 0 84 84", "aria-hidden": true as const };
  switch (shape) {
    case "pinwheel":
      // Two long ellipses crossing in an X
      return (
        <svg {...common} fill="currentColor">
          <ellipse cx="42" cy="42" rx="47" ry="15" transform="rotate(45 42 42)" />
          <ellipse cx="42" cy="42" rx="47" ry="15" transform="rotate(-45 42 42)" />
        </svg>
      );
    case "petals":
      // Four heart-shaped petals pointing to the centre
      return (
        <svg {...common} fill="currentColor">
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d="M40.5 40.5 9 31Q2 29 2 20Q2 2 20 2Q29 2 31 9Z" transform={`rotate(${a} 42 42)`} />
          ))}
        </svg>
      );
    case "cross":
      // Two rounded bars in an X with a diamond hole in the middle
      return (
        <svg {...common}>
          <defs>
            <mask id="shape-cross-hole">
              <rect width="84" height="84" fill="#fff" />
              <rect x="35" y="35" width="14" height="14" rx="2" fill="#000" transform="rotate(45 42 42)" />
            </mask>
          </defs>
          <g fill="currentColor" mask="url(#shape-cross-hole)">
            <rect x="2" y="24" width="80" height="36" rx="9" transform="rotate(45 42 42)" />
            <rect x="2" y="24" width="80" height="36" rx="9" transform="rotate(-45 42 42)" />
          </g>
        </svg>
      );
    case "brackets":
      // A bowl on top of an arch, meeting at the waist
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="17">
          <path d="M7 0a35 35 0 0 0 70 0" />
          <path d="M7 84a35 35 0 0 1 70 0" />
        </svg>
      );
  }
}
