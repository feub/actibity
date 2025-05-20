import { getWorkoutById } from "@/app/lib/data/workout";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const workout = await getWorkoutById(id);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-4">
      <header className="row-start-1">Header</header>
      <main className="row-start-2 bg-zinc-900">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center sm:items-start px-4">
          <h2>Workout {workout.name}</h2>

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
                        <h5 className="text-xl">{exercise.exercise.name}</h5>
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
          <p>
            <Link href={`/workout`}>Go back</Link>
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>actibity 2025</p>
      </footer>
    </div>
  );
}
