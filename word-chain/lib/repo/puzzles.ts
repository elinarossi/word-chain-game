import { Puzzle } from "@/lib/types";

function todayKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(
    now.getUTCDate()
  ).padStart(2, "0")}`;
}

const SAMPLES: Record<string, Puzzle> = {
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

export async function getPuzzleByDate(date?: string): Promise<Puzzle> {
  const key = date ?? todayKey();
  const fallback: Puzzle = {
    id: `puzzle-${key}`,
    date: key,
    start: "head",
    end: "tail",
    chainLength: 6,
    missingIndices: [1, 2, 3, 4],
    solution: ["head", "heal", "teal", "tell", "tall", "tail"]
  };
  return SAMPLES[key] ?? fallback;
}
