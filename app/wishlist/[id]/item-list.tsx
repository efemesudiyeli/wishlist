"use client";

import { toggleItemBought, updateItemOrder, deleteItem } from "@/lib/actions/item";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Item {
  id: string;
  name: string;
  price?: number | null;
  priority: number;
  description?: string | null;
  external_link?: string | null;
  image_url?: string | null;
  is_bought: boolean;
  created_at: string;
}

function SortableItem({
  item,
  listId,
  isOwner,
  onToggleBought,
  onDelete,
}: {
  item: Item;
  listId: string;
  isOwner: boolean;
  onToggleBought: (itemId: string, currentStatus: boolean) => void;
  onDelete: (itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityLabel = (priority: number) => {
    const labels: { [key: number]: string } = {
      1: "High",
      2: "Medium-High",
      3: "Medium",
      4: "Medium-Low",
      5: "Low",
    };
    return labels[priority] || "Medium";
  };

  const getPriorityColor = (priority: number) => {
    const colors: { [key: number]: { bg: string; text: string; emoji: string } } = {
      1: { bg: "linear-gradient(135deg, #FF6B9D, #FFB3BA)", text: "#FFF", emoji: "🔴" },
      2: { bg: "linear-gradient(135deg, #FFB84D, #FFD93D)", text: "#FFF", emoji: "🟠" },
      3: { bg: "linear-gradient(135deg, #FFE66D, #FFD93D)", text: "#8B6F47", emoji: "🟡" },
      4: { bg: "linear-gradient(135deg, #A8E6CF, #C5E1A5)", text: "#8B6F47", emoji: "🟢" },
      5: { bg: "linear-gradient(135deg, #E0E0E0, #F5F5F5)", text: "#8B6F47", emoji: "⚪" },
    };
    return colors[priority] || colors[3];
  };

  const priorityStyle = getPriorityColor(item.priority);

  return (
    <div
      ref={setNodeRef}
      className={`gift-card relative overflow-hidden ${
        item.is_bought ? "opacity-60" : ""
      }`}
      style={{
        ...style,
        background: priorityStyle.bg,
        border: `3px solid ${priorityStyle.text === "#FFF" ? "#FF6B9D" : "#FFD93D"}`,
        borderRadius: "16px",
        padding: "1.5rem",
      }}
    >
      {isOwner && (
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition-transform z-20"
          style={{
            background: "rgba(255, 107, 157, 0.9)",
            color: "#FFF",
          }}
          title="Delete item"
        >
          ✕
        </button>
      )}
      {!isOwner && <div className="absolute top-2 right-2 text-xl">🎀</div>}
      <div className="flex items-start gap-4 relative z-10">
        {isOwner && (
          <div
            {...attributes}
            {...listeners}
            className="drag-handle cursor-grab active:cursor-grabbing flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              color: "#8B6F47",
            }}
          >
            ⋮⋮
          </div>
        )}
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-xl border-2"
            style={{ borderColor: priorityStyle.text === "#FFF" ? "#FFF" : "#FFD93D" }}
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3
                  className={`text-lg font-bold ${
                    item.is_bought ? "line-through" : ""
                  }`}
                  style={{ color: priorityStyle.text }}
                >
                  {item.name}
                </h3>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#8B6F47",
                  }}
                >
                  {priorityStyle.emoji} {getPriorityLabel(item.priority)}
                </span>
              </div>
              {item.price && (
                <p
                  className="font-bold text-lg"
                  style={{ color: priorityStyle.text }}
                >
                  💰 ${item.price.toFixed(2)}
                </p>
              )}
            </div>
            {isOwner && (
              <label className="flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={item.is_bought}
                  onChange={() => onToggleBought(item.id, item.is_bought)}
                  className="h-6 w-6 rounded"
                  style={{
                    accentColor: "#FF6B9D",
                  }}
                />
                <span
                  className="ml-2 text-sm font-medium"
                  style={{ color: priorityStyle.text }}
                >
                  ✅ Bought
                </span>
              </label>
            )}
          </div>
          {item.description && (
            <p
              className="text-sm mb-2"
              style={{ color: priorityStyle.text, opacity: 0.9 }}
            >
              {item.description}
            </p>
          )}
          {item.external_link && (
            <a
              href={item.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
              style={{ color: priorityStyle.text }}
            >
              🔗 View Product →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ItemList({
  items,
  listId,
  isOwner,
}: {
  items: Item[];
  listId: string;
  isOwner: boolean;
}) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<"priority" | "name" | "price">("priority");
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedItems = [...localItems].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority - b.priority;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return priceA - priceB;
    }
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !isOwner) {
      return;
    }

    const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
    const newIndex = sortedItems.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(sortedItems, oldIndex, newIndex);
    setLocalItems(newItems);

    const newPriority = newIndex + 1;
    await updateItemOrder(active.id as string, newPriority, listId);
    router.refresh();
  };

  const handleToggleBought = async (itemId: string, currentStatus: boolean) => {
    if (!isOwner) return;
    
    await toggleItemBought(itemId, currentStatus, listId);
    router.refresh();
  };

  const handleDelete = async (itemId: string) => {
    if (!isOwner) return;
    
    if (confirm("Are you sure you want to delete this item? 🗑️")) {
      await deleteItem(itemId, listId);
      router.refresh();
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-2xl shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFF9F0, #FFF5E6)",
          border: "3px solid #FFD93D",
        }}
      >
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-xl font-semibold mb-2" style={{ color: "#8B6F47" }}>
          No items yet
        </p>
        <p className="text-base" style={{ color: "#A68B5B" }}>
          Add your first item to get started! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl shadow-lg p-4 flex items-center justify-between gift-card"
        style={{
          background: "linear-gradient(135deg, #FFF9F0, #FFF5E6)",
          border: "2px solid #FFD93D",
        }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#FF6B9D" }}>
          <span>🎁</span>
          <span>Items</span>
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium" style={{ color: "#8B6F47" }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "priority" | "name" | "price")
            }
            className="px-3 py-1 rounded-lg text-sm font-medium gift-input"
            style={{
              background: "#FFF",
              border: "2px solid #FFD93D",
              color: "#8B6F47",
            }}
          >
            <option value="priority">Priority</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      {isOwner && sortBy === "priority" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sortedItems.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  listId={listId}
                  isOwner={isOwner}
                  onToggleBought={handleToggleBought}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              listId={listId}
              isOwner={isOwner}
              onToggleBought={handleToggleBought}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

