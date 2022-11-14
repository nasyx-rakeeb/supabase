import supabase from "./SupabaseClient";

export async function getAllProjects() {
  try {
    const { data, error } = await supabase

      .from("Projects")

      .select();

    console.log("data", data);
    console.log("error", error?.message);

    if (error) return error;
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
}
export async function addProject(updata) {
  try {
    const { data, error } = await supabase

      .from("Projects")

      .insert([updata]);
    if (error) return error;
    if (data) return data;
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
export async function updateProject(id, updata) {
  try {
    const { data, error } = await supabase

      .from("Projects")

      .update(updata)

      .match({ id: id });
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProject(id) {
  try {
    const { data, error } = await supabase

      .from("Projects")

      .delete()

      .match({ id: id });
    if (error) return error;
    if (data) return data;
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
