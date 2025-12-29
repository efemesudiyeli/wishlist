"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addItem(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const listId = formData.get("list_id") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const priority = formData.get("priority") as string;
  const description = formData.get("description") as string;
  const externalLink = formData.get("external_link") as string;
  const imageUrl = formData.get("image_url") as string;

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const itemData: {
    list_id: string;
    user_id: string;
    name: string;
    price?: number | null;
    priority: number;
    description?: string | null;
    external_link?: string | null;
    image_url?: string | null;
  } = {
    list_id: listId,
    user_id: user.id,
    name: name.trim(),
    priority: priority ? parseInt(priority) : 3,
  };

  if (price) {
    const priceNum = parseFloat(price);
    if (!isNaN(priceNum)) {
      itemData.price = priceNum;
    }
  }

  if (description) {
    itemData.description = description.trim();
  }

  if (externalLink) {
    itemData.external_link = externalLink.trim();
  }

  if (imageUrl) {
    itemData.image_url = imageUrl.trim();
  }

  const { error } = await supabase.from("items").insert(itemData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/wishlist/${listId}`);
  return { success: true };
}

export async function getItems(listId: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("list_id", listId)
    .order("priority", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export async function getWishlist(wishlistId: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("wishlists")
    .select("*")
    .eq("id", wishlistId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function toggleItemBought(
  itemId: string,
  isBought: boolean,
  listId: string
) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("items")
    .update({ is_bought: !isBought })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/wishlist/${listId}`);
  return { success: true };
}

export async function updateItemOrder(
  itemId: string,
  newPriority: number,
  listId: string
) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("items")
    .update({ priority: newPriority })
    .eq("id", itemId)
    .eq("user_id", user.id)
    .eq("list_id", listId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/wishlist/${listId}`);
  return { success: true };
}

export async function deleteItem(itemId: string, listId: string) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id)
    .eq("list_id", listId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/wishlist/${listId}`);
  return { success: true };
}
