import supabase from "./supabase";

export default async function getGuests() {
  const { data, error } = await supabase.from("Guests").select("*");
  if (error) {
    throw new Error("Cant load Guests");
  }
  return data;
}

export async function createGuest(newGuest, id) {
  try {
    let query;

    if (!id) {
      query = supabase.from("Guests").insert(newGuest);
    } else {
      query = supabase.from("Guests").update(newGuest).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
      throw new Error(`Cannot create or update guest: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error creating or updating guest:", error);
    throw error;
  }
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("Guests").delete().eq("id", id);
  if (error) {
    throw new Error("Guest could not be deleted");
  }
  return data;
}
