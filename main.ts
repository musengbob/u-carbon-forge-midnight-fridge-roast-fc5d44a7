// Midnight Fridge Roast — u-carbon-forge-midnight-fridge-roast-fc5d44a7
// Writes one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt (see resolveOutputPath).
// The roast: the fridge light that judges the 3am snack, the hum that knows
// your secrets — the midnight refusal itself is the punchline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "At 3am my smart fridge clicks its light on like a courtroom lamp, locks the door, and lets the hum testify: same man, same snack, same lie.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validateSingleLine(text: string): void {
  const lines = text.split("\n");
  if (lines.length !== 1 || text.trim().length === 0) {
    throw new Error("entry must be exactly one non-blank line");
  }
}

function validateLength(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
}

function validateEntry(text: string): void {
  validateSingleLine(text);
  validateLength(text);
}

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  if (process.env.OUTPUT_PATH) return process.env.OUTPUT_PATH;
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return join(process.cwd(), "output");
}

function buildEntryLine(): string {
  validateEntry(ENTRY);
  return ENTRY;
}

function main(): void {
  const entry = buildEntryLine();
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
  console.log(`wrote entry.txt (${entry.length} chars) to ${outDir}`);
}

main();
