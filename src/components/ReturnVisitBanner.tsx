import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const prompts = [
  { text: "New thrift hunt coming this week.", link: "/episodes", cta: "See Episodes" },
  { text: "Vote on the next transformation.", link: "/community", cta: "Cast Your Vote" },
  { text: "Next drop in 3 days.", link: "/drops", cta: "View Drops" },
];

const ReturnVisitBanner = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("rvb-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIndex(Math.floor(Math.random() * prompts.length));
      setVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("rvb-dismissed", "1");
  };

  if (!visible) return null;

  const prompt = prompts[index];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-in">
      <div className="bg-primary text-primary-foreground rounded-sm shadow-xl border border-border p-4 flex items-start gap-3">
        <div className="flex-1">
          <p className="font-heading text-sm font-bold mb-1">{prompt.text}</p>
          <Link to={prompt.link} onClick={dismiss} className="text-xs font-heading uppercase tracking-widest text-rust hover:underline">
            {prompt.cta} →
          </Link>
        </div>
        <button onClick={dismiss} className="text-primary-foreground/50 hover:text-primary-foreground flex-shrink-0 mt-0.5">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReturnVisitBanner;
