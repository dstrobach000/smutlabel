"use client";

import { useState, useEffect, useCallback } from "react";

interface Comment {
  id: string;
  catalog_id: string;
  parent_id: string | null;
  nick: string;
  body: string;
  created_at: number;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "práve teraz";
  if (mins < 60) return `pred ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `pred ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `pred ${days}d`;
}

function CommentItem({
  comment,
  replies,
  allComments,
  onReply,
}: {
  comment: Comment;
  replies: Comment[];
  allComments: Comment[];
  onReply: (parentId: string) => void;
}) {
  return (
    <div className="border-l border-white/20 pl-3">
      <p className="m-0 text-sm">
        <strong>{comment.nick}</strong>
        <span className="ml-2 opacity-50">{timeAgo(comment.created_at)}</span>
      </p>
      <p className="m-0 mt-1">{comment.body}</p>
      <button
        type="button"
        onClick={() => onReply(comment.id)}
        className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-xs text-[var(--smut-link)] underline"
      >
        odpovedať
      </button>
      {replies.length > 0 && (
        <div className="mt-2 space-y-3">
          {replies.map((r) => (
            <CommentItem
              key={r.id}
              comment={r}
              replies={allComments.filter((c) => c.parent_id === r.id)}
              allComments={allComments}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Comments({ catalogId }: { catalogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nick, setNick] = useState("");
  const [nickLocked, setNickLocked] = useState(false);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("smut-nick");
    if (saved) {
      setNick(saved);
      setNickLocked(true);
    }

    fetch(`/api/comments?catalogId=${encodeURIComponent(catalogId)}`)
      .then((r) => r.json())
      .then((data) => setComments(data as Comment[]))
      .catch(() => {});
  }, [catalogId]);

  const handleReply = useCallback((parentId: string) => {
    setReplyTo(parentId);
  }, []);

  function lockNick() {
    const trimmed = nick.trim();
    if (!trimmed) return;
    localStorage.setItem("smut-nick", trimmed);
    setNick(trimmed);
    setNickLocked(true);
  }

  function changeNick() {
    setNickLocked(false);
  }

  async function submit() {
    const trimmed = text.trim();
    if (!trimmed || !nickLocked || submitting) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogId,
          parentId: replyTo,
          nick,
          text: trimmed,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        setError(`Chyba: ${res.status} — ${body}`);
        return;
      }
      const newComment: Comment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setText("");
      setReplyTo(null);
    } catch (err) {
      setError(`Chyba: ${String(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) return null;

  const topLevel = comments.filter((c) => !c.parent_id);
  const replyTarget = replyTo ? comments.find((c) => c.id === replyTo) : null;

  return (
    <section className="mt-6">
      <h3 className="m-0 mb-3 text-lg font-bold">Komentáre</h3>

      {topLevel.length === 0 && (
        <p className="m-0 mb-4 text-sm opacity-50">Zatiaľ žiadne komentáre.</p>
      )}

      <div className="space-y-4">
        {topLevel.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            replies={comments.filter((r) => r.parent_id === c.id)}
            allComments={comments}
            onReply={handleReply}
          />
        ))}
      </div>

      <div className="mt-5 border-t border-white/20 pt-4">
        {!nickLocked ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lockNick()}
              placeholder="Tvoj nick"
              className="smut-input flex-1"
            />
            <button type="button" onClick={lockNick} className="smut-btn">
              Potvrdiť
            </button>
          </div>
        ) : (
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span>
              Komentuješ ako <strong>{nick}</strong>
            </span>
            <button
              type="button"
              onClick={changeNick}
              className="cursor-pointer border-0 bg-transparent p-0 text-xs text-[var(--smut-link)] underline"
            >
              zmeniť
            </button>
          </div>
        )}

        {nickLocked && (
          <>
            {replyTarget && (
              <p className="m-0 mb-2 text-sm opacity-70">
                Odpoveď na: <strong>{replyTarget.nick}</strong>{" "}
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="cursor-pointer border-0 bg-transparent p-0 text-xs text-[var(--smut-link)] underline"
                >
                  zrušiť
                </button>
              </p>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Napíš komentár…"
                className="smut-input flex-1"
              />
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="smut-btn"
              >
                {submitting ? "…" : "Odoslať"}
              </button>
            </div>
            {error && (
              <p className="m-0 mt-2 text-sm text-red-400">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
