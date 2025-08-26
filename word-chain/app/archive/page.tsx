"use client";

import useSWR from "swr";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ArchivePage() {
  const { data, isLoading } = useSWR<{ items: { id: string; date: string; start: string; end: string; length: number }[] }>("/api/archive", fetcher);
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold">Archive</h1>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Past Puzzles</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-8 rounded-md bg-muted" />
              <div className="h-8 rounded-md bg-muted" />
              <div className="h-8 rounded-md bg-muted" />
            </div>
          ) : (
            <ul className="divide-y">
              {data?.items.map((item: { id: string; date: string; start: string; end: string; length: number }) => (
                <li key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.date}</div>
                    <div className="text-sm text-muted-foreground">{item.start} → {item.end} · {item.length} words</div>
                  </div>
                  <Link className="text-sm underline" href={`/play?date=${item.date}`}>Replay</Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
