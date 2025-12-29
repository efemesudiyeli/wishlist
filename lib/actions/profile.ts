"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const description = formData.get("description") as string;
  const avatarUrl = formData.get("avatar_url") as string;

  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const updateData: {
    username: string;
    description?: string;
    avatar_url?: string;
    updated_at: string;
  } = {
    username: username.trim(),
    updated_at: new Date().toISOString(),
  };

  if (description) {
    updateData.description = description.trim();
  }

  if (avatarUrl) {
    updateData.avatar_url = avatarUrl.trim();
  }

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

