"use server";

import prisma from "@/database/prisma";
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

export async function updateWorkoutPositionsAction(
  draggedItemId: number,
  newIndex: number,
  allWorkouts: { id: number; position: number }[],
) {
  try {
    // Remove the dragged item from the list first
    const otherWorkouts = allWorkouts.filter((w) => w.id !== draggedItemId);

    // Sort workouts by current position, and use ID as tiebreaker for items with same position
    const sortedWorkouts = otherWorkouts.sort((a, b) => {
      if (a.position === b.position) {
        return a.id - b.id; // Use ID as tiebreaker
      }
      return a.position - b.position;
    });

    let newPosition: number;

    if (newIndex === 0) {
      // Moving to the top
      if (sortedWorkouts.length === 0) {
        // If no other items, position should be 100
        newPosition = 100;
      } else {
        const firstPosition = sortedWorkouts[0].position;
        newPosition = firstPosition / 2;

        if (newPosition === firstPosition) {
          // If position would be the same (due to very small numbers), subtract 100
          newPosition = firstPosition - 100;
        }
      }
    } else if (newIndex >= sortedWorkouts.length) {
      // Moving to the bottom
      if (sortedWorkouts.length === 0) {
        newPosition = 100;
      } else {
        const lastPosition = sortedWorkouts[sortedWorkouts.length - 1].position;
        newPosition = lastPosition + 100;
      }
    } else {
      // Moving between two items - average their positions
      const prevPosition = sortedWorkouts[newIndex - 1].position;
      const nextPosition = sortedWorkouts[newIndex].position;

      if (prevPosition === nextPosition) {
        // If adjacent items have the same position, we need to space them out
        newPosition = prevPosition + 50; // Insert with a small offset
      } else {
        newPosition = (prevPosition + nextPosition) / 2;

        if (newPosition === prevPosition || newPosition === nextPosition) {
          // If the average equals one of the positions, add a small offset
          newPosition = prevPosition + (nextPosition - prevPosition) / 4;
        }
      }
    }

    // Only update the dragged item
    await prisma.workoutTemplate.update({
      where: { id: draggedItemId },
      data: { position: newPosition },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating workout positions:", error);
    return { success: false, error: "Failed to update workout positions" };
  }
}
