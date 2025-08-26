import dynamic from "next/dynamic";

const PlayClient = dynamic(() => import("./PlayClient"), { ssr: false, loading: () => (
  <div className="space-y-3">
    <div className="h-9 w-40 rounded-md bg-muted" />
    <div className="h-10 w-full rounded-md bg-muted" />
    <div className="h-10 w-full rounded-md bg-muted" />
  </div>
) });

export default function PlayPage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Play</h1>
      <div className="mt-4">
        <PlayClient />
      </div>
    </section>
  );
}
