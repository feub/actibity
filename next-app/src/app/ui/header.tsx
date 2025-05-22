import { lusitana } from "@/app/ui/fonts";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <header className="row-start-1 flex items-center p-4 bg-amber-700">
      <Typography
        variant="h1"
        sx={{
          fontSize: "3em",
          fontFamily: lusitana.style.fontFamily,
          color: "white",
        }}
      >
        actibity
      </Typography>
    </header>
  );
}
