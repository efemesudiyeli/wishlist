import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getWishlists } from "@/lib/actions/wishlist";
import { WishlistList } from "./wishlist-list";
import { CreateWishlistButton } from "./create-wishlist-button";

export default async function Home() {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect("/login");
  }

  const wishlists = await getWishlists(userData.user.id);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3" style={{ color: '#FF6B9D' }}>
              <span className="text-5xl">🎁</span>
              <span>My Wishlists</span>
            </h1>
            <p className="text-lg mt-2 flex items-center gap-2" style={{ color: '#8B6F47' }}>
              <span>✨</span>
              <span>Welcome back, {userData.profile?.username || "User"}!</span>
              <span>✨</span>
            </p>
          </div>
          <CreateWishlistButton />
        </div>
        <WishlistList wishlists={wishlists} />
      </div>
    </div>
  );
}
