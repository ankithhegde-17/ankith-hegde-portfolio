import type { CSSProperties } from "react";

const rotation = { upRight: -45, downRight: 45, down: 90 } as const;

export function Arrow({ direction = "upRight" }: {
  direction?: keyof typeof rotation;
}) {
  const style: CSSProperties = {
    verticalAlign: "-0.125em",
    transform: `rotate(${rotation[direction]}deg)`,
  };

  return (
    <svg aria-hidden="true" focusable="false" width="1em" height="1em"
      viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.6" style={style}>
      <path d="M2 8h11m-5-5 5 5-5 5" />
    </svg>
  );
}
