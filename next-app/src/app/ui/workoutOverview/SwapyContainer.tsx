"use client";

import { useEffect, useRef, useState } from "react";
import { createSwapy, Swapy } from "swapy";
import WorkoutItem from "./WorkoutItem";
import { WorkoutWithSets } from "@/app/lib/data/workout";
import { updateWorkoutPositionsAction } from "@/app/actions/workout";

export default function SwapyContainer({
  workouts,
}: {
  workouts: WorkoutWithSets[];
}) {
  // const [optimisticWorkouts, setOptimisticWorkouts] =
  useState<WorkoutWithSets[]>(workouts);
  const swapyRef = useRef<Swapy | null>(null);
  const swapyContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setOptimisticWorkouts(workouts);
  // }, [workouts]);

  useEffect(() => {
    if (swapyContainerRef.current) {
      let currentlyMovingItemId: string | null = null;

      swapyRef.current = createSwapy(swapyContainerRef.current, {
        animation: "dynamic",
        dragAxis: "y",
      });

      swapyRef.current.onSwapStart((event) => {
        currentlyMovingItemId = event.draggingItem;
      });

      swapyRef.current.onSwapEnd(async (event) => {
        const movedItemId = currentlyMovingItemId;

        // Extract the new order from the event
        const newOrder = event.slotItemMap.asArray;
        const newOrderIds = newOrder.map((item) => item.item);

        if (movedItemId) {
          const newIndex = newOrderIds.indexOf(movedItemId);

          const workoutPositions = workouts.map((w) => ({
            id: w.id,
            position: w.position || 0,
          }));

          // Update position using fractional indexing
          try {
            const result = await updateWorkoutPositionsAction(
              parseInt(movedItemId),
              newIndex,
              workoutPositions,
            );

            if (result.success === false) {
              console.error("Failed to update workout position:", result.error);
            }
          } catch (error) {
            console.error("Error updating workout position:", error);
          }
        }

        currentlyMovingItemId = null;
      });
    }

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <div className="w-full" ref={swapyContainerRef}>
        <div className="workouts">
          {workouts.map((workout) => (
            <div
              className="slot mb-4"
              key={workout.id}
              data-swapy-slot={workout.id}
            >
              {workout && (
                <div className="item" data-swapy-item={workout.id}>
                  <WorkoutItem workout={workout} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
