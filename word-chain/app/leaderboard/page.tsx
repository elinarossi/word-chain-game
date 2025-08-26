"use client";

import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LeaderboardPage() {
  const { data, isLoading } = useSWR<{ leaders: { user: string; score: number; streak: number; wins: number }[]; today: { date: string; winners: string[]; fastest: { user: string; timeSec: number }[] } }>("/api/leaderboard", fetcher);
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <div className="grid gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-6 w-40 bg-muted rounded animate-pulse" aria-busy />
            ) : (
              <div className="text-sm text-muted-foreground">
                Winners: {data?.today.winners.join(", ") || "—"}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2 animate-pulse" aria-busy>
                <div className="h-6 bg-muted rounded" />
                <div className="h-6 bg-muted rounded" />
                <div className="h-6 bg-muted rounded" />
              </div>
            ) : (
              <ol className="list-decimal pl-5 space-y-1">
                {data?.leaders.map((l: { user: string; score: number; streak: number; wins: number }) => (
                  <li key={l.user} className="flex items-center justify-between">
                    <span className="font-medium">{l.user}</span>
                    <span className="text-sm text-muted-foreground">Score: {l.score} • Streak: {l.streak} • Wins: {l.wins}</span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
