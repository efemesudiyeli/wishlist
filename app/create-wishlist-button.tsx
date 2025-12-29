"use client";

import { useState } from "react";
import { CreateWishlistForm } from "./create-wishlist-form";

export function CreateWishlistButton() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          className="rounded-2xl shadow-2xl max-w-md w-full p-6 gift-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFF9F0, #FFF5E6)',
            border: '3px solid #FFD93D'
          }}
        >
          <div className="absolute top-2 right-2 text-2xl">🎀</div>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#FF6B9D' }}>
              <span className="text-3xl">🎁</span>
              <span>Create Wishlist</span>
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-2xl hover:scale-110 transition-transform"
              style={{ color: '#8B6F47' }}
            >
              ✕
            </button>
          </div>
          <CreateWishlistForm onClose={() => setShowForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowForm(true)}
      className="gift-button px-6 py-3 text-white font-semibold rounded-xl flex items-center gap-2"
      style={{ 
        background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
        boxShadow: '0 4px 6px rgba(255, 107, 157, 0.3)'
      }}
    >
      <span className="text-xl">✨</span>
      <span>Create Wishlist</span>
      <span className="text-xl">🎁</span>
    </button>
  );
}

