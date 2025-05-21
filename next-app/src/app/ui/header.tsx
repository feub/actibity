import { lusitana } from "@/app/ui/fonts";

export default function Header() {
  return (
    <header className="row-start-1 flex items-center p-4">
      <h2
        className={`text-4xl text-amber-100 ${lusitana.className} antialiased`}
      >
        actibity
      </h2>
    </header>
  );
}
