"use server";

import {
  createWorkout,
  createWorkoutSetWithExercises,
  createWorkoutSet,
  addExercisesToSet,
  deleteWorkoutById,
} from "@/app/lib/data/workout";
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

export async function createWorkoutSetWithExercisesAction(
  workoutId: number,
  reps: number,
  exercises: {
    name: string;
    weight?: string;
    repetitions?: string;
    note?: string;
  }[],
) {
  try {
    const result = await createWorkoutSetWithExercises(
      workoutId,
      reps,
      exercises,
    );
    revalidatePath("/workout");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating workout set with exercises:", error);
    return {
      success: false,
      error: "Failed to create workout set with exercises",
    };
  }
}

export async function createWorkoutSetAction(workoutId: number, reps: number) {
  try {
    const set = await createWorkoutSet(workoutId, reps);
    revalidatePath("/workout");
    return { success: true, data: set };
  } catch (error) {
    console.error("Error creating workout's set:", error);
    return { success: false, error: "Failed to create workout's set" };
  }
}

export async function addExercisesToSetAction(
  setId: number,
  exercises: {
    name: string;
    weight?: string;
    repetitions?: string;
    note?: string;
  }[],
) {
  try {
    const result = await addExercisesToSet(setId, exercises);
    const { setId: resultSetId, exercises: resultExercises } = result.data;

    revalidatePath("/workout");
    return {
      success: true,
      data: { setId: resultSetId, exercises: resultExercises },
    };
  } catch (error) {
    console.error("Error adding exercises to set:", error);
    return { success: false, error: "Failed to add exercises to set" };
  }
}

export async function deleteWorkoutByIdAction(id: string) {
  try {
    await deleteWorkoutById(id);
    revalidatePath("/workout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting a workout:", error);
    return { success: false, error: "Failed to delete a workout" };
  }
}
