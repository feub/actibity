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
        className={`text-4xl ${lusitana.className} antialiased text-zinc-800 dark:text-zinc-300 my-8`}
      >
        Workout {workout.name}
      </h3>

      <div className=" bg-zinc-100 dark:bg-zinc-900 rounded-lg rounded-bl-4xl rounded-tr-4xl p-4">
        {workout.note && <div className="mb-4">{workout.note}</div>}
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
