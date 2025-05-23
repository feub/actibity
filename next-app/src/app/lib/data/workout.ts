import prisma from "@/database/prisma";

export type ExerciseOnSetWithExercise = {
  exercise: {
    id: number;
    name: string;
    note: string | null;
  };
  weight: string | null;
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
  return await prisma.workoutTemplate.findMany({
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
  return await prisma.workoutTemplate.findMany({
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
  return await prisma.workoutTemplate.findUniqueOrThrow({
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

export async function createWorkout(
  userId: number,
  name: string,
  note: string,
) {
  const workout = await prisma.workoutTemplate.create({
    data: {
      user: {
        connect: { id: userId },
      },
      name: name,
      note: note,
    },
  });

  return workout;
}
