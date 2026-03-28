"use client";
import React, { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Platform = "cloudinary" | "github";

interface UploadResult {
  url: string;
}

interface UploadError {
  error: string;
}

// ─── Platform Config ──────────────────────────────────────────────────────────
const PLATFORMS: Record<Platform, { label: string; endpoint: string; logo: React.ReactNode }> = {
  github: {
    label: "GitHub",
    endpoint: "/api/github-uplode",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  cloudinary: {
    label: "Cloudinary",
    endpoint: "/api/cloudinary-uplode",
    logo: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M22.29 8.678a5.11 5.11 0 0 0-4.95-3.62 5.12 5.12 0 0 0-2.33.56A7.28 7.28 0 0 0 8.33 2.5a7.29 7.29 0 0 0-7.24 8.11A5.5 5.5 0 0 0 5.5 21.5h16a4.5 4.5 0 0 0 .79-8.822zM13 14v4h-2v-4H8l4-5 4 5h-3z" />
      </svg>
    ),
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlatformDropdown({
  value,
  onChange,
}: {
  value: Platform;
  onChange: (p: Platform) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          background: "#161b22",
          border: "1px solid #30363d",
          borderRadius: 6,
          color: "#e6edf3",
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          minWidth: 160,
          justifyContent: "space-between",
          transition: "border-color .15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#8b949e")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#30363d")}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {PLATFORMS[value].logo}
          {PLATFORMS[value].label}
        </span>
        <svg
          viewBox="0 0 16 16"
          width="12"
          height="12"
          fill="#8b949e"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}
        >
          <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 6,
            overflow: "hidden",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,.5)",
          }}
        >
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => { onChange(p); setOpen(false); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 14px",
                background: p === value ? "#21262d" : "transparent",
                border: "none",
                color: "#e6edf3",
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                textAlign: "left",
                transition: "background .1s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#21262d")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = p === value ? "#21262d" : "transparent")}
            >
              {PLATFORMS[p].logo}
              {PLATFORMS[p].label}
              {p === value && (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="#58a6ff" style={{ marginLeft: "auto" }}>
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DropZone({
  onFile,
  disabled,
}: {
  onFile: (file: File) => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) onFile(file);
    },
    [disabled, onFile]
  );

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? "#58a6ff" : "#30363d"}`,
        borderRadius: 10,
        padding: "48px 24px",
        textAlign: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        background: dragging ? "rgba(88,166,255,.05)" : "#0d1117",
        transition: "border-color .2s, background .2s",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); }}
      />

      {/* Upload icon */}
      <svg
        viewBox="0 0 24 24"
        width="40"
        height="40"
        fill="none"
        stroke={dragging ? "#58a6ff" : "#484f58"}
        strokeWidth="1.5"
        style={{ marginBottom: 16, display: "block", margin: "0 auto 16px" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
      </svg>

      <p style={{ margin: 0, color: "#e6edf3", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
        {dragging ? "Drop to upload" : "Drag & drop an image"}
      </p>
      <p style={{ margin: "6px 0 0", color: "#8b949e", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
        or click to browse · PNG, JPG, GIF, WebP
      </p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 3, background: "#21262d", borderRadius: 99, overflow: "hidden", marginTop: 16 }}>
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: "linear-gradient(90deg, #58a6ff, #79c0ff)",
          borderRadius: 99,
          transition: "width .4s ease",
        }}
      />
    </div>
  );
}

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        background: "#160c0c",
        border: "1px solid #6e2c2c",
        borderRadius: 8,
        padding: "12px 14px",
        marginTop: 16,
        animation: "fadeIn .2s ease",
      }}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="#f85149" style={{ flexShrink: 0, marginTop: 1 }}>
        <path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
      <span style={{ flex: 1, color: "#f85149", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.5 }}>
        {message}
      </span>
      <button
        onClick={onDismiss}
        style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", padding: 0, fontSize: 16, lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}

function ResultCard({ url, platform }: { url: string; platform: Platform }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: 20,
        border: "1px solid #30363d",
        borderRadius: 10,
        overflow: "hidden",
        animation: "fadeIn .3s ease",
        background: "#0d1117",
      }}
    >
      {/* Image preview */}
      <div style={{ background: "#161b22", lineHeight: 0 }}>
        <img
          src={url + (platform === "github" ? "?t=" + Date.now() : "")}
          alt="Uploaded"
          style={{ width: "100%", maxHeight: 280, objectFit: "contain", display: "block" }}
        />
      </div>

      {/* URL row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderTop: "1px solid #21262d",
        }}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="#58a6ff" style={{ flexShrink: 0 }}>
          <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 2 2 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 2 2 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
        </svg>
        <span
          style={{
            flex: 1,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#8b949e",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {url}
        </span>
        <button
          onClick={copy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            background: copied ? "#1f6feb" : "#21262d",
            border: "1px solid #30363d",
            borderRadius: 6,
            color: copied ? "#fff" : "#8b949e",
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background .2s, color .2s",
          }}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
              </svg>
              Copy URL
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Upload Component ────────────────────────────────────────────────────
export default function Upload() {
  const [platform, setPlatform] = useState<Platform>("github");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      setImageUrl("");
      setFileName(file.name);
      setUploading(true);
      setProgress(10);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onerror = () => {
        setError("Failed to read the file. Please try again.");
        setUploading(false);
        setProgress(0);
      };

      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];
          setProgress(40);

          const body =
            platform === "github"
              ? JSON.stringify({ fileName: `${Date.now()}-${file.name}`, base64 })
              : JSON.stringify({ base64 });

          const res = await fetch(PLATFORMS[platform].endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });

          setProgress(80);
          const data: UploadResult & UploadError = await res.json();

          if (!res.ok || data.error) {
            setError(data.error || `Upload failed with status ${res.status}.`);
          } else {
            setImageUrl(data.url);
          }
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Network error. Please check your connection.");
        } finally {
          setProgress(100);
          setTimeout(() => { setUploading(false); setProgress(0); }, 400);
        }
      };
    },
    [platform]
  );

  const reset = () => {
    setImageUrl("");
    setError("");
    setFileName("");
    setProgress(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#010409",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div style={{ width: "100%", maxWidth: 520 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#e6edf3">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#e6edf3", letterSpacing: "-.3px" }}>
              Image Uploader
            </h1>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#484f58", fontWeight: 400 }}>v1.0</span>
          </div>

          {/* Card */}
          <div
            style={{
              background: "#0d1117",
              border: "1px solid #21262d",
              borderRadius: 12,
              padding: 24,
            }}
          >
            {/* Platform selector row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: "#8b949e" }}>Platform</span>
              <PlatformDropdown value={platform} onChange={(p) => { setPlatform(p); reset(); }} />
            </div>

            <div style={{ height: 1, background: "#21262d", marginBottom: 20 }} />

            {/* Drop zone or success state */}
            {imageUrl ? (
              <>
                <ResultCard url={imageUrl} platform={platform} />
                <button
                  onClick={reset}
                  style={{
                    width: "100%",
                    marginTop: 12,
                    padding: "9px 0",
                    background: "transparent",
                    border: "1px solid #30363d",
                    borderRadius: 8,
                    color: "#8b949e",
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    transition: "border-color .15s, color .15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#8b949e"; (e.currentTarget as HTMLButtonElement).style.color = "#e6edf3"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#30363d"; (e.currentTarget as HTMLButtonElement).style.color = "#8b949e"; }}
                >
                  ↑ Upload another
                </button>
              </>
            ) : (
              <DropZone onFile={handleUpload} disabled={uploading} />
            )}

            {/* Progress */}
            {uploading && (
              <div style={{ marginTop: 16 }}>
                <ProgressBar value={progress} />
                <p style={{ margin: "8px 0 0", fontSize: 11, color: "#8b949e", textAlign: "center" }}>
                  Uploading {fileName && <span style={{ color: "#58a6ff" }}>{fileName}</span>} to {PLATFORMS[platform].label}…
                </p>
              </div>
            )}

            {/* Error */}
            {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#484f58" }}>
            Uploads via {PLATFORMS[platform].label} API · Images stored in your account
          </p>
        </div>
      </div>
    </>
  );
}