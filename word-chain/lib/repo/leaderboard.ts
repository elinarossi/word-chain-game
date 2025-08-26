import { Leader } from "@/lib/types";

export async function getLeaders(): Promise<Leader[]> {
  return [
    { user: "alice", score: 1240, streak: 12, wins: 5 },
    { user: "bob", score: 1180, streak: 8, wins: 3 },
    { user: "chris", score: 990, streak: 4, wins: 2 }
  ];
}

export async function getTodaySummary() {
  return { date: "2025-08-26", winners: ["alice"], fastest: [{ user: "alice", timeSec: 72 }] };
}
