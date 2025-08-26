"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Puzzle = {
  id: string;
  date: string;
  start: string;
  end: string;
  chainLength: number;
  missingIndices: number[];
  solution: string[];
};

type CellState = "idle" | "correct" | "incorrect" | "locked";

export default function PlayClient() {
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [states, setStates] = useState<CellState[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = new URL(window.location.href);
        const date = url.searchParams.get("date");
        const res = await fetch(`/api/puzzle${date ? `?date=${date}` : ""}` , { cache: "no-store" });
        const data = (await res.json()) as Puzzle;
        if (cancelled) return;
        setPuzzle(data);
        // Initialize guesses with start and end locked
        const initial = Array.from({ length: data.chainLength });
        const initialGuesses = initial.map((_, i) => {
          if (i === 0) return data.start;
          if (i === data.chainLength - 1) return data.end;
          return "";
        });
        const initialStates = initial.map((_, i) =>
          i === 0 || i === data.chainLength - 1 ? "locked" : "idle"
        );
        setGuesses(initialGuesses);
        setStates(initialStates);
        setActiveIndex(data.missingIndices[0] ?? 1);
      } catch (e) {
        setMessage("Failed to load puzzle.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isIndexEditable = (index: number) => {
    if (!puzzle) return false;
    if (index === 0 || index === puzzle.chainLength - 1) return false;
    return puzzle.missingIndices.includes(index);
  };

  async function validateWord(word: string) {
    const res = await fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word })
    });
    const data = (await res.json()) as { valid: boolean };
    return data.valid;
  }

  function moveToNextEditable(from: number) {
    if (!puzzle) return from;
    const after = puzzle.missingIndices.filter((i) => i > from);
    return after[0] ?? from;
  }

  function handleChange(index: number, value: string) {
    setGuesses((prev) => {
      const next = [...prev];
      next[index] = value.toLowerCase();
      return next;
    });
  }

  async function handleSubmit(index: number) {
    if (!puzzle) return;
    const guess = guesses[index]?.trim();
    if (!guess) return;
    const valid = await validateWord(guess);
    if (!valid) {
      setStates((prev) => {
        const next = [...prev];
        next[index] = "incorrect";
        return next;
      });
      setMessage("Not in dictionary");
      setTimeout(() => setStates((prev) => ({ ...prev, [index]: "idle" } as any)), 700);
      return;
    }

    // Check against solution for correctness
    const isCorrect = puzzle.solution[index] === guess;
    setStates((prev) => {
      const next = [...prev];
      next[index] = isCorrect ? "correct" : "incorrect";
      return next;
    });

    if (isCorrect) {
      // Lock it in after animation
      setTimeout(() => {
        setStates((prev) => {
          const next = [...prev];
          next[index] = "locked";
          return next;
        });
        const nextIndex = moveToNextEditable(index);
        setActiveIndex(nextIndex);
      }, 400);
    } else {
      setTimeout(() => setStates((prev) => ({ ...prev, [index]: "idle" } as any)), 600);
    }
  }

  function handleHint(index: number, type: "first" | "last" | "skip") {
    if (!puzzle || !isIndexEditable(index)) return;
    const target = puzzle.solution[index];
    if (type === "skip") {
      setGuesses((prev) => {
        const next = [...prev];
        next[index] = target;
        return next;
      });
      setStates((prev) => {
        const next = [...prev];
        next[index] = "locked";
        return next;
      });
      const nextIndex = moveToNextEditable(index);
      setActiveIndex(nextIndex);
      return;
    }
    if (type === "first") {
      setGuesses((prev) => {
        const next = [...prev];
        next[index] = target[0] + (prev[index]?.slice(1) ?? "");
        return next;
      });
    } else if (type === "last") {
      setGuesses((prev) => {
        const next = [...prev];
        const prevVal = prev[index] ?? "";
        next[index] = (prevVal.slice(0, -1) || "") + target[target.length - 1];
        return next;
      });
    }
  }

  const completed = useMemo(() => {
    if (!puzzle) return false;
    return puzzle.missingIndices.every((i) => guesses[i] === puzzle.solution[i]);
  }, [puzzle, guesses]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daily Word Chain</span>
            {puzzle ? (
              <span className="text-sm font-normal text-muted-foreground">{puzzle.start} → {puzzle.end}</span>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-10 w-full rounded-md bg-muted" />
              <div className="h-10 w-full rounded-md bg-muted" />
              <div className="h-10 w-full rounded-md bg-muted" />
            </div>
          ) : puzzle ? (
            <div className="grid gap-3">
              {Array.from({ length: puzzle.chainLength }).map((_, i) => {
                const editable = isIndexEditable(i);
                const state = states[i] ?? "idle";
                const value = guesses[i] ?? "";
                const isActive = activeIndex === i;
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 text-xs text-muted-foreground tabular-nums">{i + 1}</div>
                      <Input
                        value={value}
                        disabled={!editable || state === "locked"}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(i);
                          }
                        }}
                        className={
                          state === "incorrect"
                            ? "border-red-400 animate-[shake_0.3s_ease]"
                            : state === "correct"
                            ? "border-green-500"
                            : ""
                        }
                        aria-invalid={state === "incorrect"}
                        aria-label={`Word ${i + 1}`}
                        autoFocus={isActive}
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleHint(i, "first")} disabled={!editable}>First</Button>
                        <Button variant="outline" size="sm" onClick={() => handleHint(i, "last")} disabled={!editable}>Last</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleHint(i, "skip")} disabled={!editable}>Skip</Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <AnimatePresence>
                {completed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md border bg-muted p-3 text-center text-sm"
                  >
                    Chain complete! 🎉
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No puzzle available.</div>
          )}
        </CardContent>
      </Card>

      {message && (
        <div role="status" aria-live="polite" className="text-sm text-muted-foreground">{message}</div>
      )}
    </div>
  );
}

