"use client";

import { useState } from "react";

export function ShareButton({ wishlistId }: { wishlistId: string }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/wishlist/${wishlistId}`;
    }
    return `/wishlist/${wishlistId}`;
  };

  const handleCopy = async () => {
    try {
      const shareUrl = getShareUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="gift-button px-4 py-2 text-white font-semibold rounded-xl flex items-center gap-2 transition-all hover:scale-105"
      style={{
        background: copied
          ? "linear-gradient(135deg, #A8E6CF, #C5E1A5)"
          : "linear-gradient(135deg, #FFB84D, #FFD93D)",
        boxShadow: "0 4px 6px rgba(255, 184, 77, 0.3)",
      }}
      title={copied ? "Copied!" : "Copy link to share"}
    >
      {copied ? (
        <>
          <span>✅</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>🔗</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
}

