import { getWorkoutById } from "@/app/lib/data/workout";
import { lusitana } from "@/app/ui/fonts";
import WorkoutViewCardItem from "@/app/ui/workoutView/WorkoutViewSetItem";
import { Button } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const workout = await getWorkoutById(id);

  return (
    <>
      <h3
        className={`text-4xl ${lusitana.className} antialiased text-gray-800 dark:text-gray-300 my-8`}
      >
        Workout {workout.name}
      </h3>

      {workout.note && <div className="mb-4">{workout.note}</div>}
      <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-6 mb-8">
        <ol className="w-full">
          {workout.sets.map((set) => (
            <WorkoutViewCardItem key={set.id} set={set} />
          ))}
        </ol>
      </div>
      <Button
        href="/workout"
        color="primary"
        size="small"
        variant="outlined"
        sx={{ mt: 4 }}
      >
        <ChevronLeftOutlinedIcon /> Go back
      </Button>
    </>
  );
}
