import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutUser } from "@/lib/actions/auth";

export async function Navigation() {
  const userData = await getCurrentUser();

  return (
    <nav className="bg-white shadow-md border-b-2 border-[#FFB3BA]" style={{ background: 'linear-gradient(to right, #FFF9F0, #FFF5E6)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="text-2xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
            style={{ color: '#FF6B9D' }}
          >
            <span className="text-3xl">🎁</span>
            <span>Wishlist</span>
            <span className="text-xl">🎀</span>
          </Link>
          <div className="flex items-center gap-4">
            {userData ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 nav-link-profile"
                  style={{ 
                    color: '#8B6F47',
                    background: 'rgba(255, 217, 61, 0.2)'
                  }}
                >
                  👤 Profile
                </Link>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 nav-link-logout"
                    style={{ 
                      color: '#8B6F47',
                      background: 'rgba(255, 107, 157, 0.2)'
                    }}
                  >
                    👋 Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 nav-link-login"
                  style={{ 
                    color: '#8B6F47',
                    background: 'rgba(168, 230, 207, 0.3)'
                  }}
                >
                  🔑 Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105 gift-button"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
                    boxShadow: '0 4px 6px rgba(255, 107, 157, 0.3)'
                  }}
                >
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

