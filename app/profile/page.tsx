import { requireAuth } from "@/lib/auth";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const { user, profile } = await requireAuth();

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
      <div className="max-w-2xl mx-auto px-4">
        <div
          className="rounded-2xl shadow-2xl p-8 gift-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFF9F0, #FFF5E6)',
            border: '3px solid #FFD93D'
          }}
        >
          <div className="absolute top-4 right-4 text-3xl">🎀</div>
          <div className="absolute top-4 left-4 text-3xl">✨</div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-6 flex items-center gap-3" style={{ color: '#FF6B9D' }}>
              <span className="text-5xl">👤</span>
              <span>Profile</span>
              <span className="text-3xl">🎁</span>
            </h1>
            <ProfileForm profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

