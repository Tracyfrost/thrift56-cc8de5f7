import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent", { description: "We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-stone-950">
      <SiteNav />

      <section className="container py-16 md:py-24 max-w-xl">
        <p className="font-serif italic text-stone-500 text-sm mb-3">Get in touch</p>
        <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter text-stone-100 mb-8">
          Contact
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-500 block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm focus:border-rust focus:outline-none"
            />
          </div>
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-500 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm focus:border-rust focus:outline-none"
            />
          </div>
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-stone-500 block mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 px-3 py-2.5 text-sm focus:border-rust focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rust text-cream font-heading text-xs uppercase tracking-[0.15em] py-3 hover:bg-rust/85 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
