import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitEntry } from "@/hooks/useSupabaseData";

interface EntryFormProps {
  pieceId: string;
  pieceTitle: string;
  mode: "raffle" | "giveaway";
}

const EntryForm = ({ pieceId, pieceTitle, mode }: EntryFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const submitEntry = useSubmitEntry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEntry.mutate({
      art_piece_id: pieceId,
      first_name: firstName,
      email,
      entry_type: mode,
    });
  };

  if (submitEntry.isSuccess) {
    return (
      <div className="text-center py-8 px-4 border border-border rounded-sm bg-card">
        <p className="font-distressed text-rust text-sm tracking-widest mb-2">YOU'RE IN</p>
        <p className="font-heading text-2xl font-bold mb-2">Entry Confirmed</p>
        <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-md mx-auto">
          If <span className="font-semibold">{pieceTitle}</span> becomes yours, you'll hear from us first.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-sm bg-card p-6">
      <p className="font-distressed text-rust text-sm tracking-widest mb-1">
        {mode === "raffle" ? "ENTER THE RAFFLE" : "ENTER THE GIVEAWAY"}
      </p>
      <p className="font-heading text-xl font-bold mb-4">{pieceTitle}</p>
      {submitEntry.isError && (
        <p className="text-destructive text-sm font-body mb-3">
          {(submitEntry.error as any)?.message?.includes("duplicate") ? "You've already entered!" : "Something went wrong. Try again."}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-background/80 border-border font-body h-11"
          required
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background/80 border-border font-body h-11"
          required
        />
        <Button type="submit" variant="rust" className="w-full h-11" disabled={submitEntry.isPending}>
          {submitEntry.isPending ? "Submitting..." : mode === "raffle" ? "Join Raffle" : "Enter Giveaway"}
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
