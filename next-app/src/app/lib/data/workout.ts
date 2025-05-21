import prisma from "@/database/prisma";
import { Prisma } from "../../../../generated/prisma";

export type ExerciseOnSetWithExercise = {
  exercise: {
    id: number;
    name: string;
    note: string | null;
  };
  weight: Prisma.Decimal | null;
  reps_time: string;
  position: number;
  note: string | null;
};

export type SetWithExercises = {
  id: number;
  reps: number;
  position: number;
  workoutId: number;
  exercises: ExerciseOnSetWithExercise[];
};

export type WorkoutWithSets = {
  id: number;
  userId: number;
  name: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  sets: SetWithExercises[];
};

export async function getFullWorkouts(): Promise<WorkoutWithSets[]> {
  return await prisma.workout.findMany({
    include: {
      sets: {
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getFullWorkoutsByUserId(
  id: string,
): Promise<WorkoutWithSets[]> {
  return await prisma.workout.findMany({
    include: {
      sets: {
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    where: { userId: parseInt(id) },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getWorkoutById(id: string) {
  return await prisma.workout.findUniqueOrThrow({
    include: {
      sets: {
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
      },
    },
    where: { id: parseInt(id) },
  });
}
