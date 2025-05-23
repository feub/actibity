import { Box } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  return (
    <Box>
      <Link href={"/workout"} className="text-gray-100">
        Workouts
      </Link>
    </Box>
  );
}
