export default function HomePage() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Word Chain</h1>
        <p className="mt-3 text-muted-foreground">
          Production-ready scaffold with Next.js 14, Tailwind, shadcn/ui, and Framer Motion
        </p>
        <div className="mt-6">
          <a href="/play" className="inline-flex rounded-md border px-4 py-2 text-sm">Start Game</a>
        </div>
      </div>
    </section>
  );
}
