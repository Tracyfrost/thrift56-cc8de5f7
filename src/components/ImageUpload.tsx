import { useState, useRef, useCallback } from "react";
import { uploadFile } from "@/hooks/useSupabaseData";
import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  bucket: string;
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  label?: string;
  hint?: string;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export default function ImageUpload({ bucket, currentUrl, onUploaded, label, hint }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setState("error");
      setErrorMsg("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setState("error");
      setErrorMsg("File must be under 10 MB.");
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setState("uploading");
    setErrorMsg("");

    try {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const publicUrl = await uploadFile(bucket, path, file);
      setPreview(publicUrl);
      onUploaded(publicUrl);
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch (err: any) {
      setState("error");
      setErrorMsg(err?.message || "Upload failed. Please try again.");
      // Keep local preview so user can retry
    } finally {
      URL.revokeObjectURL(localUrl);
    }
  }, [bucket, onUploaded]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearImage = () => {
    setPreview(null);
    setState("idle");
    setErrorMsg("");
    onUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && (
        <label className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-sm border border-border"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 bg-background/90 rounded-sm text-foreground hover:bg-background transition-colors"
              title="Replace image"
            >
              <Upload size={16} />
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="p-2 bg-background/90 rounded-sm text-destructive hover:bg-background transition-colors"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          {state === "uploading" && (
            <div className="absolute inset-0 bg-black/60 rounded-sm flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-white" />
            </div>
          )}
          {state === "success" && (
            <div className="absolute top-2 right-2">
              <CheckCircle size={20} className="text-green-400 drop-shadow" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-2 h-40 border-2 border-dashed rounded-sm cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground bg-background"
          }`}
        >
          {state === "uploading" ? (
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload size={24} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-body text-center px-4">
                Click or drag & drop to upload
              </p>
            </>
          )}
        </div>
      )}

      {hint && state !== "error" && (
        <p className="text-[10px] text-muted-foreground mt-1 font-body">{hint}</p>
      )}

      {state === "error" && (
        <p className="text-[10px] text-destructive mt-1 font-body flex items-center gap-1">
          <AlertCircle size={10} /> {errorMsg}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
}
