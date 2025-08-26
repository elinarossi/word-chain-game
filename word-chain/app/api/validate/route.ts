import { NextRequest, NextResponse } from "next/server";

const DICTIONARY = new Set<string>([
  "cold",
  "cord",
  "card",
  "ward",
  "warm",
  "head",
  "heal",
  "teal",
  "tell",
  "tall",
  "tail"
]);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { word: string };
  const word = (body?.word || "").toLowerCase();
  const valid = DICTIONARY.has(word);
  return NextResponse.json({ valid });
}
