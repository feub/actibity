import { getFullWorkoutsByUserId } from "@/app/lib/data/workout";
import { getUserById } from "@/app/lib/data/user";
import { lusitana } from "@/app/ui/fonts";
import WorkoutForm from "@/app/ui/workoutOverview/WorkoutForm";
import SwapyContainer from "@/app/ui/workoutOverview/SwapyContainer";

export default async function Page() {
  const user = await getUserById("1");
  const workouts = await getFullWorkoutsByUserId("1");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h3
          className={`text-4xl ${lusitana.className} antialiased text-gray-800 dark:text-gray-300 my-8`}
        >
          {user.name}
          {"'"}s workouts ({workouts.length})
        </h3>
        <WorkoutForm />
      </div>

      <SwapyContainer workouts={workouts} />
    </>
  );
}
