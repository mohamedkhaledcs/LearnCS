import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Scans localization, educational curriculum, question bank, UI, and documentation
 * files for forbidden Unicode em dash (U+2014) and en dash (U+2013) characters.
 */

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const SCAN_TARGETS = [
  path.join(REPO_ROOT, "README.md"),
  path.join(REPO_ROOT, "ARCHITECTURE.md"),
  path.join(REPO_ROOT, "PROJECT_RULES.md"),
  path.join(REPO_ROOT, "docs"),
  path.join(REPO_ROOT, "frontend", "app"),
  path.join(REPO_ROOT, "frontend", "components"),
  path.join(REPO_ROOT, "frontend", "lib"),
  path.join(REPO_ROOT, "backend", "src"),
  path.join(REPO_ROOT, "backend", "tests"),
];

const EXT_ALLOW = new Set([".ts", ".tsx", ".json", ".md", ".cs"]);
const IGNORE_DIRS = new Set(["node_modules", ".next", "bin", "obj", ".git"]);

interface Violation {
  file: string;
  line: number;
  column: number;
  charCode: "U+2014" | "U+2013";
  snippet: string;
}

function collectFiles(targetPath: string, out: string[]) {
  if (!fs.existsSync(targetPath)) return;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    if (EXT_ALLOW.has(path.extname(targetPath).toLowerCase())) {
      out.push(targetPath);
    }
    return;
  }
  for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    collectFiles(path.join(targetPath, entry.name), out);
  }
}

function scanFile(filePath: string): Violation[] {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const violations: Violation[] = [];
  const rel = path.relative(REPO_ROOT, filePath).replace(/\\/g, "/");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const code = line.charCodeAt(j);
      if (code === 0x2014 || code === 0x2013) {
        const start = Math.max(0, j - 25);
        const end = Math.min(line.length, j + 25);
        violations.push({
          file: rel,
          line: i + 1,
          column: j + 1,
          charCode: code === 0x2014 ? "U+2014" : "U+2013",
          snippet: line.slice(start, end).trim(),
        });
      }
    }
  }
  return violations;
}

function main() {
  const files: string[] = [];
  for (const target of SCAN_TARGETS) {
    collectFiles(target, files);
  }

  const allViolations: Violation[] = [];
  for (const f of files) {
    allViolations.push(...scanFile(f));
  }

  console.log("==================================================");
  console.log("   LearnCS Punctuation Guard (No U+2014 / U+2013) ");
  console.log("==================================================");
  console.log(`Scanned files: ${files.length}`);

  if (allViolations.length > 0) {
    console.error(`FAILED: Found ${allViolations.length} forbidden dash occurrences:`);
    for (const v of allViolations.slice(0, 80)) {
      console.error(`  ${v.file}:${v.line}:${v.column} [${v.charCode}] -> "${v.snippet}"`);
    }
    if (allViolations.length > 80) {
      console.error(`  ... and ${allViolations.length - 80} more.`);
    }
    process.exit(1);
  }

  console.log("PASSED: 0 forbidden U+2014 or U+2013 characters detected.");
}

main();
