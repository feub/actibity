import prisma from "@/database/prisma";

export async function getFullWorkouts() {
  return await prisma.workout.findMany({
    select: {
      id: true,
      name: true,
      note: true,
      sets: {
        select: {
          id: true,
          reps: true,
          ExercisesOnSets: {
            select: {
              weight: true,
              reps_time: true,
              position: true,
              note: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  note: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getWorkoutById(id: string) {
  return await prisma.workout.findUniqueOrThrow({
    select: {
      id: true,
      name: true,
      note: true,
      sets: {
        select: {
          id: true,
          reps: true,
          ExercisesOnSets: {
            select: {
              weight: true,
              reps_time: true,
              position: true,
              note: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  note: true,
                },
              },
            },
          },
        },
      },
    },
    where: { id: parseInt(id) },
  });
}
