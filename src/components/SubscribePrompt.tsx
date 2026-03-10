import { Button } from "@/components/ui/button";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@thrift56";

interface SubscribePromptProps {
  variant?: "inline" | "banner";
}

const SubscribePrompt = ({ variant = "inline" }: SubscribePromptProps) => {
  if (variant === "banner") {
    return (
      <div className="bg-primary py-6 px-6 text-center">
        <p className="font-heading text-primary-foreground text-lg uppercase tracking-wider mb-1">
          Follow the Hunt & Transformation on YouTube
        </p>
        <p className="text-primary-foreground/70 text-sm mb-4 font-body">
          New episodes every week. Subscribe so you never miss a drop.
        </p>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="rust" size="lg" className="gap-2 px-8">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-sm p-6 bg-card text-center">
      <p className="font-heading text-lg uppercase tracking-wider mb-1">
        Don't Miss the Next Transformation
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Follow the hunt and transformation on YouTube.
      </p>
      <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
        <Button variant="hero" className="gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Subscribe
        </Button>
      </a>
    </div>
  );
};

export default SubscribePrompt;
