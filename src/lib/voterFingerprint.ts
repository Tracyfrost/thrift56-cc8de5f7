// Stable per-browser fingerprint used for vote deduplication.
// Not for tracking — only sent to SECURITY DEFINER RPCs so each browser
// can only vote once per item.
const KEY = "t56_voter_fp";

export function getVoterFingerprint(): string {
  try {
    let fp = localStorage.getItem(KEY);
    if (!fp || fp.length < 8) {
      fp = crypto.randomUUID();
      localStorage.setItem(KEY, fp);
    }
    return fp;
  } catch {
    // Fallback for private mode / SSR
    return crypto.randomUUID();
  }
}
