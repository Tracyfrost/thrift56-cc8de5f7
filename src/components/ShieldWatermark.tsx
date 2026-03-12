/**
 * A faint shield silhouette watermark derived from the Thrift 56 Route-style logo shape.
 * Used as a recurring brand motif across sections.
 */
const ShieldWatermark = ({
  className = "",
  opacity = 0.04,
  size = 400,
}: {
  className?: string;
  opacity?: number;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Route-style shield / badge shape */}
      <path
        d="M100 8 L185 40 Q192 43 192 50 L192 140 Q192 170 168 195 L110 222 Q100 228 90 222 L32 195 Q8 170 8 140 L8 50 Q8 43 15 40 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ShieldWatermark;
