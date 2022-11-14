import supabase from "./SupabaseClient";
export async function signin(email, password) {
  try {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("data", data);
    console.log("error", error?.message);
    if (data?.session) {
      return data;
    } else {
      return error;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function signup(email, password) {
  try {
    console.log(email, password);
    const { data, error } = supabase.auth.signUp({ email, password });
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
