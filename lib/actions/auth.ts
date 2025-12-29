"use server";

import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerUser(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const supabase = await createServerClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Registration failed" };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: authData.user.id,
      username: username,
    });

  if (profileError) {
    return { error: profileError.message };
  }

  if (authData.session) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!
      .split("//")[1]
      ?.split(".")[0] || "default";
    
    cookieStore.set(`sb-${projectRef}-auth-token`, JSON.stringify({
      access_token: authData.session.access_token,
      refresh_token: authData.session.refresh_token,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  revalidatePath("/");
  redirect("/");
}

export async function loginUser(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!
      .split("//")[1]
      ?.split(".")[0] || "default";
    
    cookieStore.set(`sb-${projectRef}-auth-token`, JSON.stringify({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  revalidatePath("/");
  redirect("/");
}

export async function logoutUser() {
  const supabase = await createServerClient();

  await supabase.auth.signOut();

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!
    .split("//")[1]
    ?.split(".")[0] || "default";
  
  cookieStore.delete(`sb-${projectRef}-auth-token`);

  revalidatePath("/");
  redirect("/login");
}
