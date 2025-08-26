import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { prisma } from "@/lib/auth/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  const { puzzleId, guesses } = (await req.json()) as { puzzleId: string; guesses: { word: string; position: number; correct: boolean }[] };

  // Save guesses (userId null for guests)
  const userId = (session as any)?.user?.id as string | undefined;
  await prisma.$transaction(
    guesses.map((g) =>
      prisma.guess.create({
        data: {
          userId: userId || null,
          puzzleId,
          word: g.word,
          position: g.position,
          correct: g.correct
        }
      })
    )
  );

  // Increment streak if authenticated and all correct
  const allCorrect = guesses.every((g) => g.correct);
  if (userId && allCorrect) {
    const today = new Date();
    const todayDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const streak = await prisma.streak.findFirst({ where: { userId } });
    if (!streak) {
      await prisma.streak.create({ data: { userId, count: 1, lastDate: todayDate } });
    } else {
      const last = new Date(streak.lastDate);
      const isYesterday = (d: Date) => {
        const y = new Date(todayDate);
        y.setUTCDate(y.getUTCDate() - 1);
        return d.toISOString().slice(0, 10) === y.toISOString().slice(0, 10);
      };
      if (last.toISOString().slice(0, 10) === todayDate.toISOString().slice(0, 10)) {
        // already counted today
      } else if (isYesterday(last)) {
        await prisma.streak.update({ where: { id: streak.id }, data: { count: streak.count + 1, lastDate: todayDate } });
      } else {
        await prisma.streak.update({ where: { id: streak.id }, data: { count: 1, lastDate: todayDate } });
      }
    }
  }

  return NextResponse.json({ ok: true, allCorrect });
}
