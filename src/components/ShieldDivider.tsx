/**
 * A section divider featuring a small centered shield motif.
 */
const ShieldDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-4 py-2 ${className}`}>
      <div className="flex-1 h-px bg-border" />
      <svg
        width="28"
        height="32"
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-rust opacity-40"
        aria-hidden="true"
      >
        <path
          d="M100 8 L185 40 Q192 43 192 50 L192 140 Q192 170 168 195 L110 222 Q100 228 90 222 L32 195 Q8 170 8 140 L8 50 Q8 43 15 40 Z"
          fill="currentColor"
        />
      </svg>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
};

export default ShieldDivider;
