import { NextRequest, NextResponse } from "next/server";
import { validateWord } from "@/lib/repo/validate";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { word: string };
  const word = (body?.word || "").toLowerCase();
  const valid = await validateWord(word);
  return NextResponse.json({ valid });
}
