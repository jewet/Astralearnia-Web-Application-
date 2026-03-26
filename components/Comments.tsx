// components/Comments.tsx
"use client";
import { useState, useEffect } from "react";

interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface CommentsResponse {
  comments: Comment[];
}

interface PostCommentResponse {
  error?: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr + "Z").getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr + "Z").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

const AVATAR_COLORS = [
  { bg: "rgba(0,200,255,0.15)",   border: "rgba(0,200,255,0.35)",   text: "#00c8ff" },
  { bg: "rgba(168,85,247,0.15)",  border: "rgba(168,85,247,0.35)",  text: "#a855f7" },
  { bg: "rgba(0,255,178,0.12)",   border: "rgba(0,255,178,0.3)",    text: "#00ffb2" },
  { bg: "rgba(255,110,199,0.12)", border: "rgba(255,110,199,0.3)",  text: "#ff6ec7" },
];

function avatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// ─── shared input styles ───────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: "0.875rem",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  outline: "none",
  transition: "border-color 0.2s",
};

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1.5">
        <span className="text-xs font-black text-white/40 uppercase tracking-wider">{label}</span>
        {required && <span className="text-cyan-400 ml-1">*</span>}
        {hint    && <span className="text-white/25 text-xs ml-1 normal-case tracking-normal font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────
export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments]   = useState<Comment[]>([]);
  const [loading, setLoading]     = useState(true);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [message, setMessage]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    fetch(`/api/comments/${slug}`)
      .then(r => r.json() as Promise<CommentsResponse>)
      .then(data => setComments(data.comments ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, email, message }),
      });
      const data = await res.json() as PostCommentResponse;
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setSubmitted(true);
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = "rgba(0,200,255,0.45)");
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = "rgba(255,255,255,0.1)");

  return (
    <section className="mt-14 sm:mt-16 pt-10 border-t border-white/[0.07]">

      {/* ── heading ──────────────────────────────────────────────────── */}
      <h2 className="text-lg font-black text-white mb-8">
        {loading
          ? "Comments"
          : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
      </h2>

      {/* ── comment list ──────────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-4 mb-10">
          {[1, 2].map(i => (
            <div key={i} className="rounded-2xl p-5 animate-pulse"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="h-2.5 w-24 rounded bg-white/10 mb-3" />
              <div className="h-2.5 w-full rounded bg-white/10 mb-2" />
              <div className="h-2.5 w-3/4 rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4 mb-10">
          {comments.map(c => {
            const av = avatarColor(c.name);
            return (
              <div key={c.id} className="rounded-2xl p-5 sm:p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: av.bg, border: `1.5px solid ${av.border}`, color: av.text }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-black text-white leading-none">{c.name}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">{timeAgo(c.created_at)}</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{c.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-10 py-10 text-center rounded-2xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-3xl opacity-20 mb-3">◈</div>
          <p className="text-sm text-white/30">No comments yet. Be the first to share your thoughts.</p>
        </div>
      )}

      {/* ── form ─────────────────────────────────────────────────────── */}
      {submitted ? (
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg,rgba(0,200,255,0.07),rgba(124,92,255,0.07))", border: "1px solid rgba(0,200,255,0.2)" }}>
          <div className="text-2xl mb-3 text-cyan-400">✓</div>
          <p className="text-sm font-black text-white mb-1">Comment posted!</p>
          <p className="text-xs text-white/40">Thanks for sharing your thoughts.</p>
          <button onClick={() => setSubmitted(false)}
            className="mt-5 text-xs font-black text-cyan-400/70 hover:text-cyan-400 transition-colors">
            Write another →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 space-y-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-sm font-black text-white">Leave a comment</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name" maxLength={80} required
                style={inputBase} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Email" hint="(optional, not displayed)">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="jewettswift@example.com" maxLength={120}
                style={inputBase} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <Field label="Message" required>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Share your thoughts..." rows={4} maxLength={1000} required
              style={{ ...inputBase, resize: "none" }}
              onFocus={e => (e.target.style.borderColor = "rgba(0,200,255,0.45)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            <div className="text-right text-[11px] text-white/25 mt-1">
              {message.length}/1000
            </div>
          </Field>

          {error && (
            <p className="text-xs text-red-400 font-bold">{error}</p>
          )}

          <button type="submit"
            disabled={submitting || !name.trim() || !message.trim()}
            className="px-6 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>
            {submitting ? "Posting…" : "Post Comment →"}
          </button>
        </form>
      )}
    </section>
  );
}