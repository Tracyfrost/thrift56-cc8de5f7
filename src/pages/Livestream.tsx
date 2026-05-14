import { useState, useEffect } from "react";
import { Play, Clock, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { livestreamEvents } from "@/data/episodes";
import SubscribePrompt from "@/components/SubscribePrompt";
import SiteNav from "@/components/SiteNav";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const LivestreamPage = () => {
  const upcoming = livestreamEvents.filter((e) => !e.isReplay && !e.isLive);
  const replays = livestreamEvents.filter((e) => e.isReplay);
  const nextEvent = upcoming[0];
  const countdown = useCountdown(nextEvent?.scheduledAt || "");

  return (
    <div className="min-h-screen">
      <SiteNav />
      <Seo title="Livestream — Live Thrift Hunts & Studio Sessions | Thrift 56" description="Watch Thrift 56 live: thrift hunts, studio sessions, and real-time transformations with Tracie." path="/livestream" />

      {/* Hero / Next Livestream */}
      <section className="py-12 md:py-20 texture-paper">
        <div className="container">
          <div className="text-center mb-10">
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">LIVE EVENTS</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Livestreams</h1>
            <p className="text-muted-foreground mt-2">Live thrift hunts, studio sessions, and giveaway drawings.</p>
          </div>

          {nextEvent && (
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-sm overflow-hidden mb-12">
              <div className="relative aspect-video">
                <img src={nextEvent.thumbnail} alt={nextEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Radio size={16} className="text-rust animate-pulse" />
                      <span className="font-heading text-primary-foreground uppercase tracking-widest text-sm">Upcoming Live</span>
                    </div>
                    {/* Countdown */}
                    <div className="flex gap-4 justify-center">
                      {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                        <div key={unit} className="text-center">
                          <div className="bg-primary/90 text-primary-foreground font-heading text-2xl md:text-3xl w-16 h-16 flex items-center justify-center rounded-sm">
                            {countdown[unit].toString().padStart(2, "0")}
                          </div>
                          <p className="text-primary-foreground/70 text-[10px] font-heading uppercase mt-1">{unit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-2xl font-bold mb-2">{nextEvent.title}</h2>
                <p className="text-muted-foreground mb-4">{nextEvent.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock size={14} />
                  {new Date(nextEvent.scheduledAt).toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit",
                  })}
                </div>
                <Button variant="hero" size="lg" className="gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Set a Reminder on YouTube
                </Button>
              </div>
            </div>
          )}

          {/* Schedule */}
          {upcoming.length > 1 && (
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wider">Upcoming Schedule</h2>
              <div className="space-y-4">
                {upcoming.slice(1).map((event) => (
                  <div key={event.id} className="flex gap-4 items-center border border-border rounded-sm p-4 bg-card">
                    <img src={event.thumbnail} alt={event.title} className="w-24 h-16 object-cover rounded-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm truncate">{event.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {new Date(event.scheduledAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Replays */}
          {replays.length > 0 && (
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wider">Replay Archive</h2>
              <div className="space-y-4">
                {replays.map((replay) => (
                  <div key={replay.id} className="border border-border rounded-sm overflow-hidden bg-card">
                    <div className="relative aspect-video">
                      {replay.youtubeId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${replay.youtubeId}?rel=0`}
                          title={replay.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <img src={replay.thumbnail} alt={replay.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold mb-1">{replay.title}</h3>
                      <p className="text-sm text-muted-foreground">{replay.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SubscribePrompt />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default LivestreamPage;
