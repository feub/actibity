import { lusitana } from "@/app/ui/fonts";
import Typography from "@mui/material/Typography";
import ModeToggler from "./ModeToggler";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <header className="p-4">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "3em",
            fontFamily: lusitana.style.fontFamily,
          }}
        >
          actibity
        </Typography>
        <ModeToggler />
      </Box>
    </header>
  );
}
