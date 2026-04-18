import tracieImg from "@/assets/tracie-coming-soon.jpg";

const ComingSoonMarquee = () => {
  const bulbs = Array.from({ length: 12 });

  return (
    <div
      className="relative w-full aspect-video overflow-hidden"
      style={{
        border: "3px solid #c8501a",
        borderRadius: "4px",
      }}
    >
      <style>{`
        @keyframes t56-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        @keyframes t56-dash-pulse {
          0%, 100% { border-color: #c8501a; }
          50% { border-color: #e8a050; }
        }
        @keyframes t56-bulb-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .t56-flicker-a { animation: t56-flicker 2.5s infinite; }
        .t56-flicker-b { animation: t56-flicker 3s infinite; }
        .t56-flicker-c { animation: t56-flicker 4s infinite; }
        .t56-dashed {
          animation: t56-dash-pulse 1.5s infinite ease-in-out;
        }
        .t56-bulb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f5e050;
          box-shadow: 0 0 8px #f5e050;
          display: inline-block;
          animation: t56-bulb-flash 0.8s steps(2, end) infinite;
        }
        .t56-bulbs .t56-bulb:nth-child(odd) { animation-delay: 0.4s; }
        .t56-bulbs .t56-bulb:nth-child(3n) { animation-delay: 0.2s; }
      `}</style>

      {/* Background image */}
      <img
        src={tracieImg}
        alt="Tracie — Thrift 56 host"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(20, 10, 0, 0.72)" }}
      />

      {/* Inner dashed animated border */}
      <div
        className="absolute pointer-events-none t56-dashed"
        style={{
          inset: "8px",
          border: "2px dashed #c8501a",
        }}
      />

      {/* Corner L-shaped accent marks */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "18px", left: "18px", width: "12px", height: "12px", borderTop: "2px solid #c8501a", borderLeft: "2px solid #c8501a" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: "18px", right: "18px", width: "12px", height: "12px", borderTop: "2px solid #c8501a", borderRight: "2px solid #c8501a" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "18px", left: "18px", width: "12px", height: "12px", borderBottom: "2px solid #c8501a", borderLeft: "2px solid #c8501a" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "18px", right: "18px", width: "12px", height: "12px", borderBottom: "2px solid #c8501a", borderRight: "2px solid #c8501a" }}
      />

      {/* Top bulb row */}
      <div className="t56-bulbs absolute left-0 right-0 flex justify-around px-8 pointer-events-none" style={{ top: "14px" }}>
        {bulbs.map((_, i) => (
          <span key={`t-${i}`} className="t56-bulb" />
        ))}
      </div>

      {/* Bottom bulb row */}
      <div className="t56-bulbs absolute left-0 right-0 flex justify-around px-8 pointer-events-none" style={{ bottom: "14px" }}>
        {bulbs.map((_, i) => (
          <span key={`b-${i}`} className="t56-bulb" />
        ))}
      </div>

      {/* Centered text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ fontFamily: "Georgia, serif", textTransform: "uppercase", gap: "12px" }}
      >
        <p
          className="t56-flicker-a"
          style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#c8501a", margin: 0 }}
        >
          ★ Thrift 56 Presents ★
        </p>

        <hr style={{ width: "120px", border: 0, borderTop: "1px solid #c8501a", margin: 0 }} />

        <h2
          className="t56-flicker-b"
          style={{
            fontSize: "28px",
            fontWeight: 900,
            color: "#f5e050",
            textShadow: "0 0 12px #c8501a",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Coming Soon
        </h2>

        <p
          className="t56-flicker-c"
          style={{ fontSize: "13px", letterSpacing: "0.2em", color: "#e8c87a", margin: 0 }}
        >
          My Thrifty Thrifters
        </p>

        <hr style={{ width: "120px", border: 0, borderTop: "1px solid #c8501a", margin: 0 }} />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#c8501a",
            opacity: 0.55,
            margin: 0,
          }}
        >
          Episode 001 — In Production
        </p>
      </div>
    </div>
  );
};

export default ComingSoonMarquee;
