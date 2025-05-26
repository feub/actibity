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

async function getLastSetPositionForWorkout(
  workoutId: number,
): Promise<number> {
  const lastSet = await prisma.set.findFirst({
    where: { id: workoutId },
    orderBy: { position: "desc" },
  });

  return lastSet ? lastSet.position + 100 : 100;
}

export async function createWorkoutSetWithExercises(
  workoutId: number,
  reps: number,
  exercises: {
    name: string;
    weight?: string;
    reps_time?: string;
    note?: string;
  }[],
) {
  const lastSetPosition = await getLastSetPositionForWorkout(workoutId);

  // Look up or create exercises for each name
  const exerciseIds = await Promise.all(
    exercises.map(async (exercise, index) => {
      // Look up if the exercise with this name already exists
      let existingExercise = await prisma.exercise.findFirst({
        where: { name: exercise.name },
      });

      // If not, create it
      if (!existingExercise) {
        existingExercise = await prisma.exercise.create({
          data: {
            name: exercise.name,
            note: exercise.note || null,
          },
        });
      }

      return {
        exerciseId: existingExercise.id,
        weight: exercise.weight || null,
        reps_time: exercise.reps_time || "1",
        position: (index + 1) * 100,
        note: exercise.note || null,
      };
    }),
  );

  // Create the set with all exercises
  const set = await prisma.set.create({
    data: {
      workoutTemplate: {
        connect: { id: workoutId },
      },
      reps: reps,
      position: lastSetPosition,
      exercises: {
        create: exerciseIds.map((item) => ({
          exercise: {
            connect: { id: item.exerciseId },
          },
          weight: item.weight,
          reps_time: item.reps_time,
          position: item.position,
          note: item.note,
        })),
      },
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

  return set;
}

export async function createWorkoutSet(workoutId: number, reps: number) {
  const set = await prisma.set.create({
    data: {
      workoutTemplate: {
        connect: { id: workoutId },
      },
      reps: reps,
      position: 10,
      exercises: {
        create: [
          {
            exercise: {
              connect: { id: 1 },
            },
            weight: "12.5",
            reps_time: "10",
            position: 20,
            note: "Super note",
          },
        ],
      },
    },
  });

  return set;
}

export async function addExercisesToSet(
  setId: number,
  exercises: {
    name: string;
    weight?: string;
    repetitions?: string;
    note?: string;
  }[],
) {
  console.log("Adding exercises to set:", setId, exercises);

  // const workout = await prisma.exercisesOnSets.create({
  //   data: {
  //     name
  //   }
  //   data: {
  //     workoutTemplate: {
  //       connect: { id: workoutId },
  //     },
  //     reps: reps,
  //     position: 10,
  //     exercises: {
  //       create: [
  //         {
  //           exercise: {
  //             connect: { id: 1 },
  //           },
  //           weight: "12.5",
  //           reps_time: "12",
  //           position: 20,
  //           note: "Is that ok?",
  //         },
  //       ],
  //     },
  //   },
  // });

  return { data: { setId, exercises } };
}

export async function deleteWorkoutById(id: string) {
  return await prisma.workoutTemplate.delete({
    where: { id: parseInt(id) },
  });
}
