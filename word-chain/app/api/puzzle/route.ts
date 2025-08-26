import { NextResponse } from "next/server";
import { getPuzzleByDate } from "@/lib/repo/puzzles";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date") ?? undefined;
  const puzzle = await getPuzzleByDate(date);
  return NextResponse.json(puzzle, { headers: { "Cache-Control": "no-store" } });
}
