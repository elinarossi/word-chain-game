export type Puzzle = {
  id: string;
  date: string;
  start: string;
  end: string;
  chainLength: number;
  missingIndices: number[];
  solution: string[];
};

export type ArchiveItem = {
  id: string;
  date: string;
  start: string;
  end: string;
  length: number;
};

export type Leader = { user: string; score: number; streak: number; wins: number };
