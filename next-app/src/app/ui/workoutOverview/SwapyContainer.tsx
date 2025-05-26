"use client";

import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, Swapy, utils } from "swapy";
import WorkoutItem from "./WorkoutItem";
import { WorkoutWithSets } from "@/app/lib/data/workout";

export default function SwapyContainer({
  workouts,
}: {
  workouts: WorkoutWithSets[];
}) {
  const swapyRef = useRef<Swapy | null>(null);
  const swapyContainerRef = useRef<HTMLOListElement>(null);
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(workouts, "id"),
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(workouts, "id", slotItemMap),
    [workouts, slotItemMap],
  );

  useEffect(() => {
    utils.dynamicSwapy(
      swapyRef.current,
      workouts,
      "id",
      slotItemMap,
      setSlotItemMap,
    );
  }, [workouts]);

  useEffect(() => {
    if (swapyContainerRef.current) {
      swapyRef.current = createSwapy(swapyContainerRef.current, {
        manualSwap: true,
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
        setSlotItemMap(event.newSlotItemMap.asArray);
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
        {slottedItems.map(({ slotId, itemId, item: workout }) => (
          <Box
            key={slotId}
            sx={{ marginBottom: "1rem" }}
            data-swapy-slot={slotId}
          >
            <div data-swapy-item={itemId}>
              {workout && <WorkoutItem workout={workout} />}
            </div>
          </Box>
        ))}
      </ol>
    </>
  );
}
