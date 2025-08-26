export default function AboutPage() {
  return (
    <section className="py-8 prose dark:prose-invert max-w-none">
      <h1>About</h1>
      <h2>How to Play</h2>
      <p>Form a chain from the start word to the end word. Each step changes one letter and must be a valid word. Fill in the missing words to complete the chain.</p>
      <ul>
        <li>Enter guesses and press Enter to validate.</li>
        <li>Use hints to reveal the first or last letter, or skip to auto-fill.</li>
        <li>Locked words are correct and cannot be edited.</li>
      </ul>
      <h2>Credits</h2>
      <p>Built with Next.js, TailwindCSS, shadcn/ui, and Framer Motion.</p>
    </section>
  );
}
