import { NextResponse } from "next/server";
import { getLeaders, getTodaySummary } from "@/lib/repo/leaderboard";

export async function GET() {
  const [leaders, today] = await Promise.all([getLeaders(), getTodaySummary()]);
  return NextResponse.json({ leaders, today }, { headers: { "Cache-Control": "no-store" } });
}
