import { ProgressBar } from "react-aria-components";

const center = 16;
const strokeWidth = 4;
const r = 16 - strokeWidth;
const c = 2 * r * Math.PI;

export function LoadingSpinner({
  variant = "outline",
  height,
  width,
  value,
  isIndeterminate = false,
}: {
  /**
   * @default 'outline'
   */
  variant?: "outline" | "solid";
  height: number;
  width: number;
  value?: number;
  /**
   * @default false
   */
  isIndeterminate?: boolean;
}) {
  return (
    <ProgressBar
      aria-label="Loading…"
      value={value}
      isIndeterminate={isIndeterminate}
    >
      {({ percentage }) => (
        <>
          <svg
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
          >
            {variant === "outline" ? (
              <>
                <circle
                  cx={center}
                  cy={center}
                  r={r - (strokeWidth / 2 - 0.25)}
                  className="stroke-slate-100"
                  strokeWidth={0.5}
                />
                <circle
                  cx={center}
                  cy={center}
                  r={r + (strokeWidth / 2 - 0.25)}
                  className="stroke-slate-100"
                  strokeWidth={0.5}
                />
              </>
            ) : null}
            <circle
              cx={center}
              cy={center}
              r={r}
              className="stroke-blue-400"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={
                c - ((isIndeterminate ? 50 : percentage ?? 0) / 100) * c
              }
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            >
              {isIndeterminate ? (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  begin="0s"
                  dur="0.33s"
                  from="0 16 16"
                  to="360 16 16"
                  repeatCount="indefinite"
                />
              ) : null}
            </circle>
          </svg>
        </>
      )}
    </ProgressBar>
  );
}
