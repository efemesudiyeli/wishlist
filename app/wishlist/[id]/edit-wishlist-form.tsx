"use client";

import { useActionState } from "react";
import { updateWishlist } from "@/lib/actions/wishlist";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Wishlist {
  id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
}

export function EditWishlistForm({
  wishlist,
  onClose,
}: {
  wishlist: Wishlist;
  onClose?: () => void;
}) {
  const [state, formAction] = useActionState(updateWishlist, null);
  const router = useRouter();

  if (state?.success) {
    router.refresh();
    if (onClose) {
      onClose();
    } else {
      router.push(`/wishlist/${wishlist.id}`);
    }
    return null;
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="wishlist_id" value={wishlist.id} />
      {state?.error && (
        <div
          className="px-4 py-3 rounded-lg font-medium"
          style={{
            background: "rgba(255, 107, 157, 0.2)",
            border: "2px solid #FF6B9D",
            color: "#8B6F47",
          }}
        >
          ❌ {state.error}
        </div>
      )}
      <div>
        <label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-semibold mb-2"
          style={{ color: "#8B6F47" }}
        >
          <span>🎁</span>
          <span>Title *</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={wishlist.title}
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: "2px solid #FFD93D",
            background: "#FFF",
            color: "#8B6F47",
          }}
          placeholder="My Birthday Wishlist 🎂"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-semibold mb-2"
          style={{ color: "#8B6F47" }}
        >
          <span>📝</span>
          <span>Description</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={wishlist.description || ""}
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: "2px solid #FFD93D",
            background: "#FFF",
            color: "#8B6F47",
          }}
          placeholder="Optional description... ✨"
        />
      </div>
      <div className="flex items-center p-3 rounded-lg" style={{ background: "rgba(255, 217, 61, 0.2)" }}>
        <input
          id="is_public"
          name="is_public"
          type="checkbox"
          value="true"
          defaultChecked={wishlist.is_public}
          className="h-5 w-5 rounded"
          style={{ accentColor: "#FF6B9D" }}
        />
        <label
          htmlFor="is_public"
          className="ml-3 flex items-center gap-2 text-sm font-semibold"
          style={{ color: "#8B6F47" }}
        >
          <span>🌍</span>
          <span>Make this wishlist public</span>
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="gift-button flex-1 px-5 py-3 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FF6B9D, #FFD93D)",
            boxShadow: "0 4px 6px rgba(255, 107, 157, 0.3)",
          }}
        >
          <span>✨</span>
          <span>Update</span>
          <span>🎁</span>
        </button>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 font-semibold rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(139, 111, 71, 0.2)",
              color: "#8B6F47",
            }}
          >
            Cancel
          </button>
        ) : (
          <Link
            href={`/wishlist/${wishlist.id}`}
            className="px-5 py-3 font-semibold rounded-xl transition-all hover:scale-105 text-center"
            style={{
              background: "rgba(139, 111, 71, 0.2)",
              color: "#8B6F47",
            }}
          >
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}

