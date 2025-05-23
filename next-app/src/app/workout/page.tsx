import Link from "next/link";
import { getFullWorkoutsByUserId } from "../lib/data/workout";
import { getUserById } from "../lib/data/user";
import { lusitana } from "@/app/ui/fonts";
import { Box } from "@mui/material";
import WorkoutCardItem from "../ui/workoutOverview/WorkoutCardItem";
import WorkoutForm from "../ui/workoutOverview/WorkoutForm";

export default async function Page() {
  const user = await getUserById("1");
  const workouts = await getFullWorkoutsByUserId("1");

  return (
    <>
      <h3
        className={`text-4xl ${lusitana.className} antialiased text-zinc-800 dark:text-zinc-300 my-8`}
      >
        {user.name}
        {"'"}s workouts ({workouts.length})
      </h3>
      <WorkoutForm />
      <ol className="w-full">
        {workouts.map((workout) => (
          <Box key={workout.id} sx={{ marginBottom: "1rem" }}>
            <Link href={`/workout/${workout.id}/view`}>
              <WorkoutCardItem workout={workout} />
            </Link>
          </Box>
        ))}
      </ol>
    </>
  );
}
