/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { PropertyListing } from "@/lib/properties";

type PropertyFeedProps = {
  properties: PropertyListing[];
};

type FeedPostProps = {
  property: PropertyListing;
  priority?: boolean;
};

type FeedComment = {
  id: string;
  author: string;
  text: string;
};

function buildCaption(property: PropertyListing) {
  return [
    property.priceLabel,
    `${property.category} · ${property.type}`,
    property.location,
  ].join(" • ");
}

function deriveInitialLikes(property: PropertyListing) {
  return 24 + property.imageCount * 11 + property.title.length;
}

function deriveInitialComments(property: PropertyListing): FeedComment[] {
  return [];
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6.716-4.353-9.192-8.3C.98 9.889 2.198 5.75 6.07 4.6c2.319-.689 4.253.257 5.93 2.16 1.678-1.903 3.611-2.849 5.93-2.16 3.872 1.15 5.09 5.289 3.262 8.1C18.716 16.647 12 21 12 21Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3v-6.5A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  );
}

function VerifiedBadgeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="block h-3.5 w-3.5"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m8.9 12.2 2.08 2.08 4.25-4.44"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FeedPost({ property, priority = false }: FeedPostProps) {
  const images = property.images.length > 0 ? property.images : [null];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => deriveInitialLikes(property));
  const [comments, setComments] = useState<FeedComment[]>(() =>
    deriveInitialComments(property),
  );
  const [commentDraft, setCommentDraft] = useState("");
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const lastImageTapRef = useRef(0);
  const heartBurstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  function showPreviousImage() {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  function toggleLike() {
    setLiked((current) => {
      const next = !current;
      setLikeCount((count) => count + (next ? 1 : -1));
      return next;
    });
  }

  function likeOnce() {
    setLiked((current) => {
      if (current) {
        return current;
      }

      setLikeCount((count) => count + 1);
      return true;
    });
  }

  function triggerHeartBurst() {
    if (heartBurstTimeoutRef.current) {
      clearTimeout(heartBurstTimeoutRef.current);
    }

    setShowHeartBurst(false);

    setTimeout(() => {
      setShowHeartBurst(true);
      heartBurstTimeoutRef.current = setTimeout(() => {
        setShowHeartBurst(false);
        heartBurstTimeoutRef.current = null;
      }, 760);
    }, 0);
  }

  function handleImageTap() {
    const now = Date.now();

    if (now - lastImageTapRef.current <= 280) {
      likeOnce();
      triggerHeartBurst();
    }

    lastImageTapRef.current = now;
  }

  function submitComment() {
    const text = commentDraft.trim();

    if (!text) {
      return;
    }

    setComments((current) => [
      ...current,
      {
        id: `${property.id}-${current.length + 1}`,
        author: "You",
        text,
      },
    ]);
    setCommentDraft("");
    setCommentBoxOpen(true);
  }

  async function shareProperty() {
    const shareUrl = `${window.location.origin}/#property-${property.slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: buildCaption(property),
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }

      setShareState("copied");
      window.setTimeout(() => {
        setShareState("idle");
      }, 1800);
    } catch {
      setShareState("idle");
    }
  }

  return (
    <article
      id={`property-${property.slug}`}
      className="overflow-hidden rounded-[2rem] border border-[color:var(--feed-card-border)] bg-[color:var(--surface-strong)] shadow-[0_26px_80px_rgba(28,22,20,0.12)]"
    >
      <div className="flex items-center gap-3 border-b border-[color:var(--feed-card-border)] px-5 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),#e28d6f)] p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-sm font-semibold text-[color:var(--primary)]">
            {property.listingAgent.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          {property.listingAgentNeupId ? (
            <Link
              href={`/agent/${property.listingAgentNeupId}`}
              className="flex items-center gap-1.5"
            >
              <div className="truncate text-sm font-semibold text-[color:var(--foreground)]">
                {property.listingAgent}
              </div>
              <span className="mt-[1px] inline-flex shrink-0 items-center justify-center self-center text-[#1d9bf0]">
                <VerifiedBadgeIcon />
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="truncate text-sm font-semibold text-[color:var(--foreground)]">
                {property.listingAgent}
              </div>
              <span className="mt-[1px] inline-flex shrink-0 items-center justify-center self-center text-[#1d9bf0]">
                <VerifiedBadgeIcon />
              </span>
            </div>
          )}
          <div className="truncate text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {property.location}
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="min-w-0">
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6 text-[color:var(--muted)]">
            <span>
              {property.location} • {property.purpose} • {property.category}
            </span>
            <button
              type="button"
              onClick={() => setDetailsExpanded((current) => !current)}
              className="text-[0.72rem] font-medium text-[color:var(--muted)]/80 transition-colors hover:text-[color:var(--muted)]"
            >
              {detailsExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
        {detailsExpanded ? (
          <div className="mt-2 space-y-1.5">
            <h2 className="text-[0.95rem] font-semibold leading-6 text-[color:var(--foreground)]">
              {property.title}
            </h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              {property.summary}
            </p>
          </div>
        ) : null}
      </div>

      <div
        className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(110,31,45,0.08),rgba(255,255,255,0.98)_55%),radial-gradient(circle_at_top_right,rgba(226,141,111,0.28),transparent_42%),linear-gradient(180deg,#efe6da,#f9f5f0)]"
        onPointerUp={handleImageTap}
      >
        {showHeartBurst ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="feed-heart-burst">
              <HeartIcon filled />
            </div>
          </div>
        ) : null}
        {images[activeImageIndex] ? (
          <img
            src={images[activeImageIndex] ?? ""}
            alt={property.title}
            className="block max-h-[75vh] min-h-[18rem] w-full object-cover object-center"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex min-h-[18rem] w-full items-end bg-[linear-gradient(180deg,rgba(110,31,45,0.05),rgba(33,24,21,0.28)),linear-gradient(135deg,#f1e3d4,#fdfaf6)] p-6">
            <div className="rounded-[1.5rem] bg-white/88 px-4 py-3 shadow-sm backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                Visual pending
              </div>
              <div className="mt-2 font-display text-[1.8rem] tracking-[-0.02em] text-[color:var(--foreground)]">
                {property.title}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(33,24,21,0),rgba(33,24,21,0.46))]" />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Show previous property image"
              onClick={showPreviousImage}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/50"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Show next property image"
              onClick={showNextImage}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/50"
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : null}

        <div className="absolute inset-x-0 top-4 flex justify-center gap-1.5 px-4">
          {images.map((_, index) => (
            <span
              key={`${property.id}-dot-${index}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeImageIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLike}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              liked ? "text-[color:var(--primary)]" : "text-[color:var(--foreground)]"
            }`}
          >
            <HeartIcon filled={liked} />
            <span>Like</span>
            <span>{likeCount.toLocaleString("en-US")}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const shouldOpen = !commentBoxOpen;
              setCommentBoxOpen(shouldOpen);
              if (shouldOpen) {
                window.setTimeout(() => {
                  const element = document.getElementById(`comment-box-${property.id}`);
                  element?.focus();
                }, 0);
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--primary)]"
          >
            <CommentIcon />
            <span>Comment</span>
          </button>
          <button
            type="button"
            onClick={shareProperty}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--primary)]"
          >
            <ShareIcon />
            <span>Share</span>
          </button>
        </div>

        {comments.length > 0 ? (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => (
              <p key={comment.id} className="text-sm leading-6 text-[color:var(--foreground)]">
                <span className="font-semibold">{comment.author}</span> {comment.text}
              </p>
            ))}
          </div>
        ) : null}

        {commentBoxOpen ? (
          <div className="mt-4 flex gap-3 border-t border-[color:var(--feed-card-border)] pt-4">
            <input
              id={`comment-box-${property.id}`}
              type="text"
              value={commentDraft}
              onChange={(event) => setCommentDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitComment();
                }
              }}
              placeholder="Comment on this property"
              className="h-12 flex-1 rounded-full border border-[color:var(--feed-card-border)] bg-[color:var(--surface)] px-4 text-sm text-[color:var(--foreground)] outline-none transition-colors placeholder:text-[color:var(--muted)] focus:border-[color:var(--primary)]"
            />
            <button
              type="button"
              onClick={submitComment}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--primary-strong)]"
            >
              Post
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PropertyFeed({ properties }: PropertyFeedProps) {
  return (
    <div className="mx-auto w-full max-w-[43rem] px-4 py-6 sm:px-6 lg:py-10">
      <section className="space-y-6">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <FeedPost
              key={property.id}
              property={property}
              priority={index === 0}
            />
          ))
        ) : (
          <div className="rounded-[2rem] border border-[color:var(--feed-card-border)] bg-[color:var(--surface-strong)] p-8 text-center shadow-[0_20px_70px_rgba(28,22,20,0.08)]">
            <div className="font-display text-[1.8rem] tracking-[-0.02em] text-[color:var(--foreground)]">
              No posts yet
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              Property listings could not be loaded from the upstream API.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
