import { getWishlist, getItems } from "@/lib/actions/item";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ItemList } from "./item-list";
import { AddItemButton } from "./add-item-button";
import { ShareButton } from "./share-button";
import Link from "next/link";

export default async function WishlistPage({
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
  const items = await getItems(id);

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

  if (wishlist.user_id !== userData.user.id && !wishlist.is_public) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#FF6B9D' }}>
            Access Denied
          </h1>
          <p style={{ color: '#8B6F47' }}>This wishlist is private.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="mb-6 gift-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFB3BA, #FF6B9D)',
            border: '3px solid #FFD93D',
            borderRadius: '20px',
            padding: '2rem',
          }}
        >
          <div className="absolute top-4 right-4 text-3xl">🎀</div>
          <div className="absolute top-4 left-4 text-3xl">✨</div>
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3 flex items-center gap-3" style={{ color: '#FFF' }}>
                <span className="text-5xl">🎁</span>
                <span>{wishlist.title}</span>
              </h1>
              {wishlist.description && (
                <p className="text-lg mt-2" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                  {wishlist.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ShareButton wishlistId={id} />
              {wishlist.user_id === userData.user.id && (
                <>
                  <Link
                    href={`/wishlist/${id}/settings`}
                    className="gift-button px-4 py-2 text-white font-semibold rounded-xl flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #A8E6CF, #C5E1A5)",
                      boxShadow: "0 4px 6px rgba(168, 230, 207, 0.3)",
                    }}
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </Link>
                  <AddItemButton listId={id} />
                </>
              )}
            </div>
          </div>
        </div>
        <ItemList items={items} listId={id} isOwner={wishlist.user_id === userData.user.id} />
      </div>
    </div>
  );
}

