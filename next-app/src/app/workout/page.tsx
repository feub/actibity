import prisma from "@/database/prisma";

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

  console.log("workouts", workouts);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
    font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Workouts</h2>
        <ol className="">
          {workouts.map((workout) => (
            <li
              key={workout.id}
              className="flex flex-col gap-[16px] items-center sm:items-start bg-amber-950 p-[16px] rounded-[8px]"
            >
              <h3 className="text-[24px]">
                {workout.name} (id: {workout.id})
              </h3>
              <p className="text-[16px]">Note: {workout.note}</p>
              <ol>
                {workout.sets.map((set) => (
                  <li
                    key={set.id}
                    className="flex flex-col gap-[16px] items-center sm:items-start bg-amber-900 p-[16px] rounded-[8px]"
                  >
                    <h4 className="text-[20px]">Set (id: {set.id})</h4>
                    <p className="text-[16px]">reps: {set.reps}</p>
                    <ol>
                      {set.ExercisesOnSets.map((exercise) => (
                        <li
                          key={exercise.position}
                          className="flex flex-col gap-[16px] items-center sm:items-start bg-amber-800 p-[16px] rounded-[8px] mb-4"
                        >
                          <h5 className="text-[18px]">
                            {exercise.exercise.name} (id: {exercise.exercise.id}
                            )
                          </h5>
                          <div className="flex gap-[8px]">
                            <p className="text-[16px]">
                              weight: {exercise.weight?.toString() || ""}
                            </p>
                            <p className="text-[16px]">
                              reps/time: {exercise.reps_time}
                            </p>
                          </div>
                          <p className="text-[16px]">Note: {exercise.note}</p>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ol>
              <ol>
                {/* <p className="text-[16px]">setId: {workout.sets.id}</p> */}
              </ol>
            </li>
          ))}
        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>actibity 2025</p>
      </footer>
    </div>
  );
}
