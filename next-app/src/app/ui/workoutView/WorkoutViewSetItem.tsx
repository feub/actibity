"use client";

import React from "react";
import { SetWithExercises } from "@/app/lib/data/workout";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { Typography, Chip } from "@mui/material";

export default function WorkoutViewSetItem({ set }: { set: SetWithExercises }) {
  return (
    <div className=" bg-zinc-200 dark:bg-zinc-800 rounded-lg rounded-bl-4xl rounded-tr-4xl p-4 mb-4">
      <div className="w-full flex justify-between items-center">
        <h4 className="text-lg mb-4">
          Set to be repeated{" "}
          <span className="text-lime-600 dark:text-lime-400 font-bold">
            {set.reps}
          </span>{" "}
          times
        </h4>
      </div>
      <ol className="w-full">
        {set.exercises.map((exercise, idx) => (
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
            key={idx}
          >
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {exercise.reps_time} reps
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                sx={{ fontSize: "1.5rem", marginTop: "-0.4rem" }}
              >
                <Typography
                  variant="h5"
                  component="span"
                  sx={{ color: "lime.main", display: "flex", gap: "0.5rem" }}
                >
                  {exercise.exercise.name}
                  <Chip
                    label={exercise.weight?.toString() + " kg" || ""}
                    sx={{
                      backgroundColor: "lime.light",
                      color: "lime.contrastText",
                    }}
                  />
                </Typography>
                {exercise.note && (
                  <Typography
                    sx={{ fontSize: ".85rem", marginTop: "0.75rem" }}
                    className="text-zinc-500"
                  >
                    {exercise.note}
                  </Typography>
                )}
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}
      </ol>
    </div>
  );
}
