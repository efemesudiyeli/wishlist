"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createWishlist(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const isPublic = formData.get("is_public") === "true";

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("wishlists").insert({
    user_id: user.id,
    title: title.trim(),
    description: description.trim() || null,
    is_public: isPublic,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function getWishlists(userId: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("wishlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export async function updateWishlist(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const wishlistId = formData.get("wishlist_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const isPublic = formData.get("is_public") === "true";

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("wishlists")
    .update({
      title: title.trim(),
      description: description.trim() || null,
      is_public: isPublic,
      updated_at: new Date().toISOString(),
    })
    .eq("id", wishlistId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/wishlist/${wishlistId}`);
  revalidatePath("/");
  return { success: true };
}

