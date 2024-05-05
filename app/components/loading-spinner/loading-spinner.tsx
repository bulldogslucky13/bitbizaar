import { ProgressBar } from "react-aria-components";

const center = 16;
const strokeWidth = 4;
const r = 16 - strokeWidth;
const c = 2 * r * Math.PI;

export function LoadingSpinner(props: {
  height: number;
  width: number;
  value?: number;
  isIndeterminate?: boolean;
}) {
  return (
    <ProgressBar
      aria-label="Loading…"
      value={props.value}
      isIndeterminate={props.isIndeterminate}
    >
      {({ percentage }) => (
        <>
          <svg
            width={props.width}
            height={props.height}
            viewBox="0 0 32 32"
            fill="none"
            strokeWidth={strokeWidth}
          >
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
            <circle
              cx={center}
              cy={center}
              r={r}
              className="stroke-blue-400"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={
                c - ((props.isIndeterminate ? 50 : percentage ?? 0) / 100) * c
              }
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            >
              {props.isIndeterminate ? (
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
