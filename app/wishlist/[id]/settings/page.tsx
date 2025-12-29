import { getWishlist } from "@/lib/actions/item";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EditWishlistForm } from "../edit-wishlist-form";
import { ShareButton } from "../share-button";
import Link from "next/link";

export default async function WishlistSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userData = await getCurrentUser();

  if (!userData) {
    redirect("/login");
  }

  const wishlist = await getWishlist(id);

  if (!wishlist) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#FF6B9D' }}>
            Wishlist not found
          </h1>
          <p style={{ color: '#8B6F47' }}>This wishlist doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    );
  }

  if (wishlist.user_id !== userData.user.id) {
    redirect(`/wishlist/${id}`);
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/wishlist/${id}`}
            className="inline-flex items-center gap-2 text-lg font-semibold mb-4 hover:underline"
            style={{ color: '#FF6B9D' }}
          >
            ← Back to Wishlist
          </Link>
        </div>
        <div
          className="gift-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFF9F0, #FFF5E6)',
            border: '3px solid #FFD93D',
            borderRadius: '20px',
            padding: '2rem',
          }}
        >
          <div className="absolute top-4 right-4 text-3xl">⚙️</div>
          <div className="absolute top-4 left-4 text-3xl">🎀</div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold flex items-center gap-3" style={{ color: '#FF6B9D' }}>
                <span className="text-5xl">⚙️</span>
                <span>Wishlist Settings</span>
              </h1>
              <ShareButton wishlistId={id} />
            </div>
            <EditWishlistForm wishlist={wishlist} />
          </div>
        </div>
      </div>
    </div>
  );
}

