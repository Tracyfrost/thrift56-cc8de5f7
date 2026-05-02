import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase
        .from("contact_messages")
        .insert({ id, name, email, message });
      if (error) throw error;

      // Fire-and-forget both emails (don't block UX on email errors)
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: email,
          idempotencyKey: `contact-confirm-${id}`,
          templateData: { name, message },
        },
      });
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: "hello@thrift56.com",
          idempotencyKey: `contact-notify-${id}`,
          templateData: { name, email, message },
        },
      });

      toast.success("Message sent", { description: "We'll get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Could not send", { description: "Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      <SiteNav />

      <section className="container py-16 md:py-24 max-w-xl">
        <p className="font-serif italic text-stone-500 text-sm mb-3">Get in touch</p>
        <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter text-stone-950 mb-8">
          Contact
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-600 block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white border border-stone-300 text-stone-950 px-3 py-2.5 text-sm focus:border-orange-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-600 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-stone-300 text-stone-950 px-3 py-2.5 text-sm focus:border-orange-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-600 block mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-white border border-stone-300 text-stone-950 px-3 py-2.5 text-sm focus:border-orange-800 focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-800 text-[#F9F6F0] font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-orange-900 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
