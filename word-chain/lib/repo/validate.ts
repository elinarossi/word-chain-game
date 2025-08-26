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

export async function validateWord(word: string): Promise<boolean> {
  return DICTIONARY.has(word.toLowerCase());
}
