"use client";

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { createSwapy, Swapy } from "swapy";
import WorkoutItem from "./WorkoutItem";
import { WorkoutWithSets } from "@/app/lib/data/workout";

export default function SwapyContainer({
  workouts,
}: {
  workouts: WorkoutWithSets[];
}) {
  const swapyRef = useRef<Swapy | null>(null);
  const swapyContainerRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (swapyContainerRef.current) {
      swapyRef.current = createSwapy(swapyContainerRef.current, {
        // animation: 'dynamic'
        // swapMode: 'drop',
        // autoScrollOnDrag: true,
        // enabled: true,
        // dragAxis: 'x',
        // dragOnHold: true
      });

      swapyRef.current.onBeforeSwap((event) => {
        console.log("Before swap", event);
        return true;
      });

      swapyRef.current.onSwapStart((event) => {
        console.log("start", event);
      });
      swapyRef.current.onSwap((event) => {
        console.log("swap", event);
      });
      swapyRef.current.onSwapEnd((event) => {
        console.log("end", event);
      });
    }

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <ol className="w-full" ref={swapyContainerRef}>
        {workouts.map((workout) => (
          <Box
            key={workout.id}
            sx={{ marginBottom: "1rem" }}
            data-swapy-slot={workout.id}
          >
            <div data-swapy-item={workout.id}>
              <WorkoutItem workout={workout} />
            </div>
          </Box>
        ))}
      </ol>
    </>
  );
}
