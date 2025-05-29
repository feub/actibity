import { useState } from "react";
import { WorkoutWithSets } from "@/app/lib/data/workout";
import { deleteWorkoutByIdAction } from "@/app/actions/workout";
import { barlow } from "@/app/ui/fonts";
import Link from "next/link";
import WorkoutAddSetForm from "./WorkoutAddSetForm";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Button, ListItemIcon, ListItemText } from "@mui/material";

export default function WorkoutItem({ workout }: { workout: WorkoutWithSets }) {
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorMenuEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuEl(null);
  };

  const getWorkoutSetsAndExercisesCounts = (): {
    exercisesCount: number;
    setsCount: number;
  } => {
    const exercisesCount = workout.sets.reduce(
      (acc, set) => acc + set.exercises.length,
      0,
    );
    const setsCount = workout.sets.length;
    return { exercisesCount, setsCount };
  };

  const {
    exercisesCount,
    setsCount,
  }: { exercisesCount: number; setsCount: number } =
    getWorkoutSetsAndExercisesCounts();

  return (
    <div className="bg-stone-200 dark:bg-stone-900 rounded-lg p-4">
      <div className="w-full flex justify-between items-start">
        <div className="flex items-center gap-4">
          <DragIndicatorOutlinedIcon
            className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-200 cursor-move"
            data-swapy-handle
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-3xl">
              <Link
                href={`/workout/${workout.id}/view`}
                className={`${barlow.className} font-bold antialiased text-stone-700 dark:text-stone-300`}
              >
                {workout.name}
              </Link>
            </h4>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`flex gap-2 ${barlow.className} text-lg font-semibold antialiased`}
          >
            <span
              className={`text-stone-100 dark:text-stone-300 bg-stone-600 dark:bg-black rounded-full px-3 py-1 inline-block`}
            >
              {setsCount > 0
                ? `${setsCount} ${setsCount <= 1 ? "set" : "sets"}`
                : "No sets"}
            </span>
            <span
              className={`text-stone-900 dark:text-stone-300 bg-stone-300 dark:bg-stone-800  rounded-full px-3 py-1 inline-block`}
            >
              {exercisesCount > 0
                ? `${exercisesCount} ${
                    exercisesCount <= 1 ? "exercise" : "exercises"
                  }`
                : "No exercises"}
            </span>
          </div>
          <Button
            id="workout-menu-button"
            aria-controls={openMenu ? "worlout-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertOutlinedIcon className="self-center text-stone-400" />
          </Button>
          <Menu
            id="worlout-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorMenuEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <WorkoutAddSetForm
              workoutId={workout.id}
              workoutName={workout.name}
            />
            <MenuItem
              onClick={() => deleteWorkoutByIdAction(workout.id.toString())}
              className="bg-stone-300"
            >
              <ListItemIcon>
                <DeleteOutlineIcon className="text-red-700" />
              </ListItemIcon>
              <ListItemText className="text-red-700">Delete</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
