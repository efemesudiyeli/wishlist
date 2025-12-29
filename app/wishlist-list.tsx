import Link from "next/link";

interface Wishlist {
  id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
  created_at: string;
  updated_at?: string | null;
}

export function WishlistList({ wishlists }: { wishlists: Wishlist[] }) {
  if (wishlists.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #FFF9F0, #FFF5E6)' }}>
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-xl font-semibold mb-2" style={{ color: '#8B6F47' }}>No wishlists yet</p>
        <p className="text-base" style={{ color: '#A68B5B' }}>Create your first wishlist to get started! ✨</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlists.map((wishlist, index) => {
        const colors = [
          { bg: 'linear-gradient(135deg, #FFB3BA, #FF6B9D)', border: '#FF6B9D' },
          { bg: 'linear-gradient(135deg, #FFE66D, #FFD93D)', border: '#FFD93D' },
          { bg: 'linear-gradient(135deg, #C5E1A5, #A8E6CF)', border: '#A8E6CF' },
        ];
        const color = colors[index % colors.length];
        
        return (
          <Link
            key={wishlist.id}
            href={`/wishlist/${wishlist.id}`}
            className="gift-card block relative overflow-hidden"
            style={{
              background: color.bg,
              border: `3px solid ${color.border}`,
            }}
          >
            <div className="absolute top-2 right-2 text-2xl gift-ribbon">🎀</div>
            <div className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold flex-1" style={{ color: '#FFF' }}>
                  {wishlist.title}
                </h3>
                {wishlist.is_public && (
                  <span 
                    className="text-xs px-3 py-1 rounded-full font-semibold ml-2"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#8B6F47'
                    }}
                  >
                    🌍 Public
                  </span>
                )}
              </div>
              {wishlist.description && (
                <p 
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                >
                  {wishlist.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-lg">📅</span>
                <p 
                  className="text-xs font-medium"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  Created {new Date(wishlist.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

