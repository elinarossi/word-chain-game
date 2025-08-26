import { NextResponse } from "next/server";

type Puzzle = {
  id: string;
  date: string;
  start: string;
  end: string;
  chainLength: number;
  missingIndices: number[];
  solution: string[];
};

function getTodayKey() {
  const now = new Date();
  const key = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(
    now.getUTCDate()
  ).padStart(2, "0")}`;
  return key;
}

const SAMPLE_PUZZLES: Record<string, Puzzle> = {
  // Simple chain where each word changes one letter from start to end
  // Missing indices are the ones the player must guess
  ["2025-08-26"]: {
    id: "puzzle-2025-08-26",
    date: "2025-08-26",
    start: "cold",
    end: "warm",
    chainLength: 6,
    missingIndices: [1, 2, 3, 4],
    solution: ["cold", "cord", "card", "ward", "warm", "warm"]
  }
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dateParam = url.searchParams.get("date");
  const key = dateParam ?? getTodayKey();
  const fallback: Puzzle = {
    id: `puzzle-${key}`,
    date: key,
    start: "head",
    end: "tail",
    chainLength: 6,
    missingIndices: [1, 2, 3, 4],
    solution: ["head", "heal", "teal", "tell", "tall", "tail"]
  };
  const puzzle = SAMPLE_PUZZLES[key] ?? fallback;
  return NextResponse.json(puzzle, { headers: { "Cache-Control": "no-store" } });
}
