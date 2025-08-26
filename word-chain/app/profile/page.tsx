export default function ProfilePage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="mt-4 grid gap-4">
        <div className="rounded-lg border p-4">
          <div className="font-medium">Streak</div>
          <div className="text-sm text-muted-foreground">0 days</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-medium">Games Played</div>
          <div className="text-sm text-muted-foreground">0</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-medium">Best Time</div>
          <div className="text-sm text-muted-foreground">—</div>
        </div>
        <div>
          <button className="rounded-md border px-4 py-2 text-sm">Log in</button>
        </div>
      </div>
    </section>
  );
}
