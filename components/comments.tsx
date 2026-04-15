"use client";

import { useState, useEffect, useCallback } from "react";

interface Comment {
  id: string;
  nick: string;
  text: string;
  ts: number;
  parentId: string | null;
}

function getStorageKey(catalogId: string) {
  return `smut-comments-${catalogId}`;
}

function loadComments(catalogId: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(catalogId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveComments(catalogId: string, comments: Comment[]) {
  localStorage.setItem(getStorageKey(catalogId), JSON.stringify(comments));
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
        <span className="ml-2 opacity-50">{timeAgo(comment.ts)}</span>
      </p>
      <p className="m-0 mt-1">{comment.text}</p>
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
              replies={allComments.filter((c) => c.parentId === r.id)}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComments(loadComments(catalogId));
    const saved = localStorage.getItem("smut-nick");
    if (saved) {
      setNick(saved);
      setNickLocked(true);
    }
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

  function submit() {
    const trimmed = text.trim();
    if (!trimmed || !nickLocked) return;
    const newComment: Comment = {
      id: crypto.randomUUID(),
      nick,
      text: trimmed,
      ts: Date.now(),
      parentId: replyTo,
    };
    const next = [...comments, newComment];
    setComments(next);
    saveComments(catalogId, next);
    setText("");
    setReplyTo(null);
  }

  if (!mounted) return null;

  const topLevel = comments.filter((c) => !c.parentId);
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
            replies={comments.filter((r) => r.parentId === c.id)}
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
              <button type="button" onClick={submit} className="smut-btn">
                Odoslať
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
