"use server";
import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "./supabaseServer";
import { revalidatePath } from "next/cache";
import { getServerSupabaseClientReadyOnly } from "./supabaseReadOnly";

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

export async function getCurrentUserData() {
  const supabase = await getServerSupabaseClientReadyOnly();
  const data = await supabase.auth.getUser();
  const user = data?.data?.user;
  const email = user?.email;
  const user1 = await supabase.from("users").select("id").eq("email", email);
  const id = user1?.data[0]?.id;
  const data1 = await supabase.from("reports").select("*").eq("userId", id);
  return data1;
}
export async function getcurrentOfficalData() {
  const supabase = await getServerSupabaseClientReadyOnly();
  const data = await supabase.auth.getUser();
  const user = data?.data?.user;
  const email = user?.email;
  const user1 = await supabase
    .from("users")
    .select("name,governmentId")
    .eq("email", email);

  return user1.data[0];
}
export async function getId() {
  const supabase = await getServerSupabaseClientReadyOnly();
  const data = await supabase.auth.getUser();
  const user = data?.data?.user;
  const email = user?.email;
  const person = await supabase.from("users").select("id").eq("email", email);
  const data1 = person?.data;
  const id = data1[0]?.id;
  return id;
}

export async function getReports() {
  const supabase = await getServerSupabaseClientReadyOnly();
  const reports = await supabase.from("reports").select("*");

  const newReports = reports.data.map((item) => {
    const { created_at: time, address: location, title, id, status } = item;
    return { time, location, title, id, status };
  });
  return newReports;
}
