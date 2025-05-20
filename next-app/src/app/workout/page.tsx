import prisma from "@/database/prisma";
import Link from "next/link";

export default async function Page() {
  const workouts = await prisma.workout.findMany({
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

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-4">
      <header className="row-start-1">Header</header>
      <main className="row-start-2 bg-zinc-900">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center sm:items-start px-4">
          <h2>Workouts</h2>
          <ol className="w-full">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="w-full flex flex-col gap-4 items-center sm:items-start bg-amber-950 p-4 rounded-xl mb-4"
              >
                <h3 className="text-3xl">
                  <Link href={`/workout/${workout.id}/view`}>
                    {workout.name}
                  </Link>
                </h3>
                {workout.note && (
                  <p className="text-sm text-amber-700">Note: {workout.note}</p>
                )}
                <ol className="w-full">
                  {workout.sets.map((set) => (
                    <li
                      key={set.id}
                      className="w-full flex flex-col gap-4 items-center sm:items-start bg-amber-900 p-4 rounded-xl mb-4"
                    >
                      <div className="w-full flex justify-between items-center">
                        <h4 className="text-2xl">
                          Set to be repeated {set.reps} times
                        </h4>
                        <p className="text-sm text-amber-700">id: {set.id}</p>
                      </div>
                      <ol className="w-full">
                        {set.ExercisesOnSets.map((exercise) => (
                          <li
                            key={exercise.position}
                            className="w-full flex flex-col gap-4 items-center sm:items-start bg-amber-800 p-4 rounded-lg mb-4"
                          >
                            <div className="w-full flex justify-between items-center">
                              <h5 className="text-xl">
                                {exercise.exercise.name}
                              </h5>
                              <div className="flex flex-row items-between gap-4">
                                <p className="text-md">
                                  weight:{" "}
                                  <span className=" font-bold">
                                    {exercise.weight?.toString() + " kg" || ""}
                                  </span>
                                </p>
                                <p className="text-md">
                                  reps:{" "}
                                  <span className=" font-bold">
                                    {exercise.reps_time}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {exercise.note && (
                              <p className="text-sm text-amber-600 italic">
                                Note: {exercise.note}
                              </p>
                            )}
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>actibity 2025</p>
      </footer>
    </div>
  );
}
