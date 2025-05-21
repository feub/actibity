import Link from "next/link";
import { getFullWorkoutsByUserId } from "../lib/data/workout";
import { getUserById } from "../lib/data/user";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  const user = await getUserById("1");
  const workouts = await getFullWorkoutsByUserId("1");

  const getWorkoutSetsAndExercisesCounts = (
    workoutId: string,
  ): { exercisesCount: number; setsCount: number } => {
    const workout = workouts.find(
      (workout) => workout.id === parseInt(workoutId),
    );
    if (!workout) {
      return { exercisesCount: 0, setsCount: 0 };
    }
    const exercisesCount = workout.sets.reduce(
      (acc, set) => acc + set.exercises.length,
      0,
    );
    const setsCount = workout.sets.length;
    return { exercisesCount, setsCount };
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center sm:items-start p-4">
      <h3 className={`text-4xl ${lusitana.className} antialiased`}>
        {user.name}
        {"'"}s workouts ({workouts.length})
      </h3>
      <p></p>
      <ol className="w-full">
        {workouts.map((workout) => {
          const {
            exercisesCount,
            setsCount,
          }: { exercisesCount: number; setsCount: number } =
            getWorkoutSetsAndExercisesCounts(workout.id.toString());
          return (
            <div key={workout.id}>
              <Link href={`/workout/${workout.id}/view`}>
                <li className="w-full flex flex-col gap-4 items-center sm:items-start bg-amber-950 p-4 rounded-xl mb-4">
                  <div className="w-full flex justify-between items-start">
                    <h4 className="text-3xl">{workout.name}</h4>
                    <div className="text-right text-sm text-zinc-400">
                      <p className="mb-2">
                        <span className="italic font-bold text-lg bg-amber-800 rounded-full px-3 py-1 inline-block">
                          {exercisesCount}{" "}
                          {exercisesCount <= 1 ? "exercise" : "exercises"}
                        </span>
                      </p>
                      <p>
                        <span className="italic font-bold text-lg bg-amber-800 rounded-full px-3 py-1 inline-block">
                          {setsCount} {setsCount <= 1 ? "set" : "sets"}
                        </span>
                      </p>
                    </div>
                  </div>
                  {workout.note && (
                    <p className="text-sm text-amber-700">
                      Note: {workout.note}
                    </p>
                  )}
                </li>
              </Link>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
