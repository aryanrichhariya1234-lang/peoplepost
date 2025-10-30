"use server";
import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "./supabaseServer";
import { revalidatePath } from "next/cache";

export async function signUpAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  const governmentId = formData?.get("governmentId");
  const name = formData.get("name");
  const role = governmentId ? "official" : "citizen";

  if (password !== passwordConfirm) return;
  const supabase = await getServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return { error };
  }
  if (role === "citizen") {
    const { data, error } = await supabase
      .from("users")
      .insert({ name, email, role });
    if (error) {
      console.log(error);
      return { error };
    }
    redirect("/report");
  } else {
    const { data1, error1 } = await supabase
      .from("users")
      .insert({ name, email, role, governmentId });
    if (error1) {
      console.log(error1);
      return { error1 };
    }
    redirect("/gov-dashboard");
  }
  return data;
}

export async function signout() {
  const supabase = await getServerSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  // redirect("/");
}

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = await getServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
  }
  console.log(data);
  redirect("/");
}
