import { Puzzle } from "@/lib/types";
import { prisma } from "@/lib/auth/prisma";

function todayKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(
    now.getUTCDate()
  ).padStart(2, "0")}`;
}

export async function getPuzzleByDate(date?: string): Promise<Puzzle> {
  const key = date ?? todayKey();
  const dateObj = new Date(key + "T00:00:00.000Z");
  const existing = await prisma.puzzle.findUnique({ where: { date: dateObj } });
  if (existing) {
    const data = existing.chain as any;
    return {
      id: existing.id,
      date: key,
      start: data.start,
      end: data.end,
      chainLength: data.chainLength,
      missingIndices: data.missingIndices,
      solution: data.solution
    };
  }
  // create fallback puzzle in DB
  const fallback = {
    start: "head",
    end: "tail",
    chainLength: 6,
    missingIndices: [1, 2, 3, 4],
    solution: ["head", "heal", "teal", "tell", "tall", "tail"]
  };
  const created = await prisma.puzzle.create({
    data: {
      date: dateObj,
      chain: fallback
    }
  });
  return {
    id: created.id,
    date: key,
    ...fallback
  };
}
