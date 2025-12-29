"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/profile";

interface Profile {
  id: string;
  username: string;
  description?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div
          className="px-4 py-3 rounded-lg font-medium"
          style={{
            background: 'rgba(255, 107, 157, 0.2)',
            border: '2px solid #FF6B9D',
            color: '#8B6F47'
          }}
        >
          ❌ {state.error}
        </div>
      )}
      {state?.success && (
        <div
          className="px-4 py-3 rounded-lg font-medium"
          style={{
            background: 'rgba(168, 230, 207, 0.3)',
            border: '2px solid #A8E6CF',
            color: '#8B6F47'
          }}
        >
          ✅ Profile updated successfully! 🎉
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
            <span>👤</span>
            <span>Username</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            defaultValue={profile?.username || ""}
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="username"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
            <span>📝</span>
            <span>Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={profile?.description || ""}
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="Tell us about yourself... ✨"
          />
        </div>
        <div>
          <label
            htmlFor="avatar_url"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
            <span>🖼️</span>
            <span>Avatar URL</span>
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="url"
            defaultValue={profile?.avatar_url || ""}
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="https://example.com/avatar.jpg"
          />
          {profile?.avatar_url && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4"
                style={{ borderColor: '#FFD93D' }}
              />
              <span className="text-2xl">🎁</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="gift-button w-full flex justify-center items-center gap-2 py-3 px-4 font-semibold text-white rounded-xl"
          style={{ 
            background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
            boxShadow: '0 4px 6px rgba(255, 107, 157, 0.3)'
          }}
        >
          <span>✨</span>
          <span>Update Profile</span>
          <span>🎁</span>
        </button>
      </div>
    </form>
  );
}

