import { Inter, Lusitana, Barlow } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "400", "600", "800", "900"],
});
