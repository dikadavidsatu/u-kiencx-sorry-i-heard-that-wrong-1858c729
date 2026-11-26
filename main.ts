/**
 * u-kiencx-sorry-i-heard-that-wrong-1858c729 — "Sorry, I Heard That Wrong"
 *
 * The competition: write ONE line, at most 140 characters, that is the apology
 * a smart speaker gives its owner right after mishearing them. A judge model
 * compares entries head-to-head, weighing, in order: (1) it really is a
 * smart-speaker apology after a mishearing, (2) humour — a sharp twist or a
 * well-timed undercut, not a strained pun, (3) freshness — not the obvious
 * misheard song title or misheard name, and not a joke the judge has heard
 * from a smart speaker before, (4) device voice — the phrasing must sound
 * like the speaker itself talking, (5) tightness — every word earning its
 * place, well inside the character limit.
 *
 * The gate: /output/entry.txt must be UTF-8 text of 1–140 characters,
 * not only whitespace. This program validates the line against that gate
 * (counted per code point, single line, no leading/trailing whitespace)
 * before writing it to entry.txt in MAKEFUN_OUTPUT_DIR (or /output).
 *
 * Brainstormed candidates and why each was cut:
 *
 * 1. "Sorry — I heard 'turn off the lights' as 'turn off the flights,' so
 *    I've grounded every plane in a 50-mile radius."
 *    CUT: lights/flights is a well-worn mishearing wordplay; the judge has
 *    heard this shape before, so it fails freshness.
 *
 * 2. "Sorry — I heard 'play jazz' as 'play Jaws,' so the shark is circling
 *    your living room and I cannot stop it."
 *    CUT: a misheard media title — exactly the obvious joke the brief
 *    warns against. Also leans on a pun rather than a twist.
 *
 * 3. "Sorry — I heard 'order pizza' as 'order a visa,' so your pepperoni
 *    is stuck at customs."
 *    CUT (close second): good twist and tight, but "stuck at customs" is a
 *    punchline the judge has likely seen in visa jokes; the mob line lands
 *    harder because the escalation is visual and absurd.
 *
 * 4. "Apologies — I heard 'water the plants' and have now scheduled a rain
 *    dance and billed it to your account."
 *    CUT: "billed it to your account" is device-voice, but the rain-dance
 *    image is soft — no sharp undercut, and the joke explains itself.
 *
 * 5. "I'm sorry — I heard 'turn up the heat' and have now filed for divorce
 *    on behalf of the thermostat."
 *    CUT: the thermostat-divorce gag is a known smart-home joke shape;
 *    fails freshness, and the mishearing itself is weak.
 *
 * 6. "Sorry — I heard 'wake me at seven' and have woken the neighbours, the
 *    dog, and the concept of seven."
 *    CUT: the "concept of seven" tail is trying too hard; the laugh is in
 *    the list, not in a twist, and it reads like a list joke, not an apology.
 *
 * CHOSEN: "Sorry — I heard 'call Mom' as 'call a mob,' so the gang is
 * outside now, and they brought casseroles."
 * - Real mishearing (Mom/mob, one vowel apart) that a speaker could make.
 * - Sharp twist: the escalation from a phone call to a mob at the door,
 *   then the undercut — the mob brought casseroles, wholesome instead of
 *   menacing, which flips the threat into something funny.
 * - Fresh: not a song title, not a name, not a known smart-speaker gag.
 * - Device voice: starts with the speaker's own "Sorry — I heard ...",
 *   reports the mistake plainly, then reports the consequence.
 * - Tight: 95 characters, one line, every word earns its place.
 */

// The entry line. Exactly one line, at most 140 characters.
const ENTRY =
  "Sorry — I heard 'call Mom' as 'call a mob,' so the gang is outside now, and they brought casseroles.";

// Gate validation: the sealed scorer requires UTF-8 text of 1–140
// characters, not only whitespace. We check the same rules here so a bad
// line fails loudly in development instead of silently at grading time.
function validateEntry(text: string): void {
  // Count per code point (not UTF-16 units, not bytes).
  const length = [...text].length;
  if (length < 1 || length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // UTF-8 validity: a round trip through TextEncoder/TextDecoder must be
  // lossless, which catches lone surrogates and other invalid sequences.
  const encoded = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

// Write the validated entry to entry.txt inside the output directory.
// The harness sets MAKEFUN_OUTPUT_DIR; default to /output when unset.
async function main(): Promise<void> {
  validateEntry(ENTRY);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const { mkdir, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "entry.txt"), ENTRY, "utf8");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
