import { useState, useEffect } from "react";

interface DropCountdownProps {
  targetDate: string;
  label?: string;
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const DropCountdown = ({ targetDate, label = "Next Drop" }: DropCountdownProps) => {
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate);

  if (expired) {
    return (
      <div className="text-center">
        <p className="font-distressed text-rust text-sm tracking-widest mb-1">{label}</p>
        <p className="font-heading text-2xl font-bold">DROP IS LIVE</p>
      </div>
    );
  }

  const blocks = [
    { value: days, unit: "Days" },
    { value: hours, unit: "Hrs" },
    { value: minutes, unit: "Min" },
    { value: seconds, unit: "Sec" },
  ];

  return (
    <div className="text-center">
      <p className="font-distressed text-rust text-sm tracking-widest mb-3">{label}</p>
      <div className="flex justify-center gap-3">
        {blocks.map((b) => (
          <div key={b.unit} className="bg-primary text-primary-foreground rounded-sm px-3 py-2 min-w-[56px]">
            <span className="block font-heading text-2xl md:text-3xl font-bold leading-none">
              {String(b.value).padStart(2, "0")}
            </span>
            <span className="block text-[10px] font-heading uppercase tracking-wider opacity-70 mt-1">
              {b.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropCountdown;
