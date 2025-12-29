"use client";

import { useActionState } from "react";
import { loginUser } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, formAction] = useActionState(loginUser, null);

  return (
    <form action={formAction} className="mt-8 space-y-6">
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
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
            <span>📧</span>
            <span>Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
            <span>🔒</span>
            <span>Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="••••••••"
          />
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
          <span>Sign In</span>
          <span>🎁</span>
        </button>
      </div>
      <div className="text-center">
        <a
          href="/register"
          className="text-sm font-medium hover:underline transition-all"
          style={{ color: '#FF6B9D' }}
        >
          Don't have an account? Sign up 🎀
        </a>
      </div>
    </form>
  );
}
