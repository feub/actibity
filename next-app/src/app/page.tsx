import Link from "next/link";

export default async function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
    font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Dev menu</h2>
        <p>
          <Link href={"/workout"} className="text-gray-100">
            Workouts
          </Link>
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>actibity 2025</p>
      </footer>
    </div>
  );
}
