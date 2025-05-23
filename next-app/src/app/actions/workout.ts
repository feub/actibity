"use server";

import { createWorkout } from "@/app/lib/data/workout";
import { revalidatePath } from "next/cache";

export async function createWorkoutAction(
  userId: number,
  name: string,
  note: string,
) {
  try {
    const workout = await createWorkout(userId, name, note);
    revalidatePath("/workout");
    return { success: true, data: workout };
  } catch (error) {
    console.error("Error creating workout:", error);
    return { success: false, error: "Failed to create workout" };
  }
}
