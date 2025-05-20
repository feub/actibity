import prisma from "@/database/prisma";

export default async function Home() {
  const workouts = await prisma.workout.findMany();

  console.log(workouts);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
    font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Workouts</h2>
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex flex-col gap-[16px] items-center sm:items-start"
          >
            <h3 className="text-[24px]">{workout.name}</h3>
            <p className="text-[16px]">{workout.note}</p>
          </div>
        ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>actibity 2025</p>
      </footer>
    </div>
  );
}
