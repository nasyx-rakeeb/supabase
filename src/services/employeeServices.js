import supabase from "./SupabaseClient";

export async function getAllEmployees() {
  try {
    const { data, error } = await supabase

      .from("Employees")

      .select();
    // console.log("data", data);
    // console.log("error", error?.message);
    if (data) return data;
    if (error) return error;
  } catch (error) {
    console.log(error);
  }
}
export async function addEmployee(updata) {
  try {
    const { data, error } = await supabase

      .from("Employees")

      .insert([updata]);
    console.log("data", data);
    console.log("error", error?.message);
    if (data) {
      return data;
    }
    if (error) {
      return error;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function updateEmployee(id, updata) {
  try {
    const { data, error } = await supabase

      .from("Employees")

      .update(updata)

      .match({ id: id });
    if (data) return data;
    if (error?.message) return error.message;
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteEmployee(id) {
  try {
    console.log(id);
    const { data, error } = await supabase

      .from("Employees")

      .delete()

      .match({ id });
    console.log("data", data);
    console.log("error", error?.message);
  } catch (error) {
    console.log(error);
  }
}
