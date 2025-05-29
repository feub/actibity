"use client";

import React from "react";
import { SetWithExercises } from "@/app/lib/data/workout";
import { barlow } from "@/app/ui/fonts";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

export default function WorkoutViewSetItem({ set }: { set: SetWithExercises }) {
  return (
    <div className="mb-8">
      <h4 className="text-lg mb-2 text-gray-600 dark:text-gray-500">
        Set to be repeated{" "}
        <span className="text-orange-500 dark:text-orange-600 font-bold">
          {set.reps}
        </span>{" "}
        times
      </h4>

      <div className=" bg-gray-200 dark:bg-gray-800 rounded-xl p-4 mb-4">
        <div className="w-full">
          <div>
            {set.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start align-top gap-2"
              >
                <div>
                  <span
                    className={`${barlow.className} antialiased font-bold text-orange-500 dark:text-orange-600`}
                  >
                    {exercise.reps_time}
                  </span>{" "}
                  reps
                </div>
                <ChevronRightOutlinedIcon />
                <div>
                  <div
                    className={`font-bold text-orange-500 dark:text-orange-600 text-2xl leading-none`}
                  >
                    {exercise.exercise.name}
                  </div>
                  {exercise.note && (
                    <div className="text-sm text-gray-500 mt-2 mb-4">
                      {exercise.note}
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`font-semibold text-sm text-gray-900 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full px-3 py-1`}
                  >
                    {exercise.weight?.toString() + " kg" || ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
