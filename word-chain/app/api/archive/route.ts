import { NextResponse } from "next/server";

export type ArchiveItem = {
  id: string;
  date: string; // YYYY-MM-DD
  start: string;
  end: string;
  length: number;
};

const ARCHIVE: ArchiveItem[] = [
  { id: "puzzle-2025-08-25", date: "2025-08-25", start: "cold", end: "warm", length: 6 },
  { id: "puzzle-2025-08-24", date: "2025-08-24", start: "head", end: "tail", length: 6 },
  { id: "puzzle-2025-08-23", date: "2025-08-23", start: "book", end: "text", length: 5 }
];

export async function GET() {
  return NextResponse.json({ items: ARCHIVE }, { headers: { "Cache-Control": "no-store" } });
}
