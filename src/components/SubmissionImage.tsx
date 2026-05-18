import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Resolves a signed URL for an image stored in the private 'submissions' bucket.
 * Pass the submission row id; the edge function decides whether to release a URL
 * (public if approved, admin-only otherwise).
 */
export function useSubmissionImageUrl(submissionId: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!submissionId) {
      setUrl(null);
      return;
    }
    (async () => {
      const { data, error } = await supabase.functions.invoke("submission-image-url", {
        body: { id: submissionId },
      });
      if (!cancelled && !error && data?.url) setUrl(data.url);
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  return url;
}

export default function SubmissionImage({
  submissionId,
  alt,
  className,
}: {
  submissionId: string;
  alt: string;
  className?: string;
}) {
  const url = useSubmissionImageUrl(submissionId);
  if (!url) {
    return <div className={`${className ?? ""} bg-stone-200 animate-pulse`} />;
  }
  return <img src={url} alt={alt} className={className} loading="lazy" />;
}
