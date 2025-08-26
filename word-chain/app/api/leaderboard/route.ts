import { NextResponse } from "next/server";

type Leader = { user: string; score: number; streak: number; wins: number };

const LEADERBOARD: Leader[] = [
  { user: "alice", score: 1240, streak: 12, wins: 5 },
  { user: "bob", score: 1180, streak: 8, wins: 3 },
  { user: "chris", score: 990, streak: 4, wins: 2 }
];

const TODAY = { date: "2025-08-26", winners: ["alice"], fastest: [{ user: "alice", timeSec: 72 }] };

export async function GET() {
  return NextResponse.json(
    { leaders: LEADERBOARD, today: TODAY },
    { headers: { "Cache-Control": "no-store" } }
  );
}
