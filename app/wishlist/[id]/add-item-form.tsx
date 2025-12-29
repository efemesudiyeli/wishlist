"use client";

import { useActionState } from "react";
import { addItem } from "@/lib/actions/item";
import { useRouter } from "next/navigation";

export function AddItemForm({
  listId,
  onClose,
}: {
  listId: string;
  onClose: () => void;
}) {
  const [state, formAction] = useActionState(addItem, null);
  const router = useRouter();

  if (state?.success) {
    router.refresh();
    onClose();
    return null;
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="list_id" value={listId} />
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
      <div>
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
            style={{ color: '#8B6F47' }}
          >
          <span>🎁</span>
          <span>Item Name *</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: '2px solid #FFD93D',
            background: '#FFF',
            color: '#8B6F47'
          }}
          placeholder="e.g., iPhone 15 Pro 📱"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
            <label
              htmlFor="price"
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: '#8B6F47' }}
          >
            <span>💰</span>
            <span>Price</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            placeholder="0.00"
          />
        </div>
        <div>
            <label
              htmlFor="priority"
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: '#8B6F47' }}
          >
            <span>⭐</span>
            <span>Priority</span>
          </label>
          <select
            id="priority"
            name="priority"
            className="gift-input block w-full px-4 py-3 font-medium"
            style={{
              border: '2px solid #FFD93D',
              background: '#FFF',
              color: '#8B6F47'
            }}
            defaultValue="3"
          >
            <option value="1">🔴 High (1)</option>
            <option value="2">🟠 Medium-High (2)</option>
            <option value="3">🟡 Medium (3)</option>
            <option value="4">🟢 Medium-Low (4)</option>
            <option value="5">⚪ Low (5)</option>
          </select>
        </div>
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
          rows={3}
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: '2px solid #FFD93D',
            background: '#FFF',
            color: '#8B6F47'
          }}
          placeholder="Optional description... ✨"
        />
      </div>
      <div>
        <label
          htmlFor="external_link"
          className="flex items-center gap-2 text-sm font-semibold mb-2"
          style={{ color: '#8B6F47' }}
        >
          <span>🔗</span>
          <span>Link</span>
        </label>
        <input
          id="external_link"
          name="external_link"
          type="url"
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: '2px solid #FFD93D',
            background: '#FFF',
            color: '#8B6F47'
          }}
          placeholder="https://example.com/product"
        />
      </div>
      <div>
        <label
          htmlFor="image_url"
          className="flex items-center gap-2 text-sm font-semibold mb-2"
          style={{ color: '#8B6F47' }}
        >
          <span>🖼️</span>
          <span>Image URL</span>
        </label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          className="gift-input block w-full px-4 py-3 font-medium"
          style={{
            border: '2px solid #FFD93D',
            background: '#FFF',
            color: '#8B6F47'
          }}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="gift-button flex-1 px-5 py-3 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          style={{ 
            background: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
            boxShadow: '0 4px 6px rgba(255, 107, 157, 0.3)'
          }}
        >
          <span>✨</span>
          <span>Add Item</span>
          <span>🎁</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-3 font-semibold rounded-xl transition-all hover:scale-105"
          style={{
            background: 'rgba(139, 111, 71, 0.2)',
            color: '#8B6F47'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

