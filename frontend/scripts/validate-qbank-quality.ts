import { QUESTION_BANK } from "../lib/assessment/data";
import { CONCEPTS } from "../lib/curriculum/registries/concept-registry";

const FORBIDDEN_DASH_RE = /[\u2014\u2013]/;

function checkPunctuation(label: string, text: string | undefined, errors: string[]) {
  if (!text) return;
  if (FORBIDDEN_DASH_RE.test(text)) {
    errors.push(`Forbidden em/en dash found in ${label}: ${text.slice(0, 80)}`);
  }
}

function validateQuestionBankQuality() {
  console.log("==================================================");
  console.log("   LearnCS Question Bank Quality Validator        ");
  console.log("==================================================\n");

  const errors: string[] = [];
  const total = QUESTION_BANK.length;

  if (total < 450) {
    errors.push(`Expected at least 450 questions in QUESTION_BANK, found ${total}`);
  }

  const seenIds = new Set<string>();
  const seenPrompts = new Set<string>();
  const domains = new Map<string, number>();

  const posCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let fourOptCount = 0;
  let enStrictLongest = 0;
  let enLongestOrTied = 0;
  let arStrictLongest = 0;
  let arLongestOrTied = 0;

  for (const q of QUESTION_BANK) {
    if (seenIds.has(q.id)) errors.push(`Duplicate question ID: ${q.id}`);
    seenIds.add(q.id);

    const normPrompt = (q.question?.en || "").trim().toLowerCase();
    if (!normPrompt) {
      errors.push(`Empty English question prompt on ${q.id}`);
    } else if (seenPrompts.has(normPrompt)) {
      errors.push(`Duplicate question prompt on ${q.id}: ${normPrompt.slice(0, 70)}`);
    }
    seenPrompts.add(normPrompt);

    if (!(q.question?.ar || "").trim()) errors.push(`Empty Arabic question prompt on ${q.id}`);
    if (!(q.explanation?.en || "").trim()) errors.push(`Empty English explanation on ${q.id}`);
    if (!(q.explanation?.ar || "").trim()) errors.push(`Empty Arabic explanation on ${q.id}`);

    checkPunctuation(`${q.id}.question.en`, q.question?.en, errors);
    checkPunctuation(`${q.id}.question.ar`, q.question?.ar, errors);
    checkPunctuation(`${q.id}.explanation.en`, q.explanation?.en, errors);
    checkPunctuation(`${q.id}.explanation.ar`, q.explanation?.ar, errors);

    domains.set(q.domain, (domains.get(q.domain) || 0) + 1);

    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`Question ${q.id} has fewer than 2 options`);
      continue;
    }

    const correctIdx = q.options.findIndex((o) => o.id === q.correctAnswer);
    if (correctIdx < 0) {
      errors.push(`Question ${q.id} correctAnswer '${String(q.correctAnswer)}' does not match any option id`);
      continue;
    }

    for (const o of q.options) {
      if (!(o.text?.en || "").trim()) errors.push(`Empty EN option text on ${q.id}/${o.id}`);
      if (!(o.text?.ar || "").trim()) errors.push(`Empty AR option text on ${q.id}/${o.id}`);
      checkPunctuation(`${q.id}.${o.id}.en`, o.text?.en, errors);
      checkPunctuation(`${q.id}.${o.id}.ar`, o.text?.ar, errors);
    }

    if (q.options.length === 4) {
      fourOptCount++;
      posCounts[correctIdx] = (posCounts[correctIdx] || 0) + 1;
    }

    const cEn = q.options[correctIdx].text.en.trim().length;
    const maxOtherEn = Math.max(...q.options.filter((_, idx) => idx !== correctIdx).map((o) => o.text.en.trim().length));
    if (cEn > maxOtherEn) enStrictLongest++;
    if (cEn >= maxOtherEn) enLongestOrTied++;

    const cAr = q.options[correctIdx].text.ar.trim().length;
    const maxOtherAr = Math.max(...q.options.filter((_, idx) => idx !== correctIdx).map((o) => o.text.ar.trim().length));
    if (cAr > maxOtherAr) arStrictLongest++;
    if (cAr >= maxOtherAr) arLongestOrTied++;
  }

  for (let i = 0; i < 4; i++) {
    const ratio = fourOptCount > 0 ? posCounts[i] / fourOptCount : 0;
    if (ratio > 0.35) {
      errors.push(`Option slot index ${i} holds ${(ratio * 100).toFixed(1)}% of correct answers (must be <= 35%)`);
    }
  }

  const enStrictPct = (enStrictLongest / total) * 100;
  const enTiePct = (enLongestOrTied / total) * 100;
  const arStrictPct = (arStrictLongest / total) * 100;
  const arTiePct = (arLongestOrTied / total) * 100;

  if (enStrictPct > 35 || enTiePct > 38) {
    errors.push(`EN length bias exceeds limits: strict=${enStrictPct.toFixed(1)}%, tie=${enTiePct.toFixed(1)}%`);
  }
  if (arStrictPct > 35 || arTiePct > 38) {
    errors.push(`AR length bias exceeds limits: strict=${arStrictPct.toFixed(1)}%, tie=${arTiePct.toFixed(1)}%`);
  }

  // Verify domain and unit coverage across all 48 canonical learning units
  if (domains.size < 10) {
    errors.push(`Expected at least 10 CS domains covered in QUESTION_BANK, found ${domains.size}`);
  }

  let unitCount = 0;
  let minMappedPerUnit = Infinity;
  let totalMappings = 0;
  for (const concept of Object.values(CONCEPTS)) {
    for (const unit of concept.units) {
      unitCount++;
      const mapped = unit.assessmentQuestionIds || [];
      totalMappings += mapped.length;
      if (mapped.length < minMappedPerUnit) minMappedPerUnit = mapped.length;
      if (mapped.length < 8) {
        errors.push(`Unit ${unit.id} has only ${mapped.length} mapped questions (expected >= 8)`);
      }
      for (const qid of mapped) {
        if (!seenIds.has(qid)) errors.push(`Unit ${unit.id} maps missing question ID ${qid}`);
      }
    }
  }

  console.log(`Questions:                  ${total}`);
  console.log(`Domains covered:            ${domains.size}`);
  console.log(`Units checked:              ${unitCount} (min mapped=${minMappedPerUnit}, total mappings=${totalMappings})`);
  console.log(`4-opt slot counts (0/1/2/3):`, posCounts);
  console.log(`EN longest-or-tied / strict: ${enTiePct.toFixed(1)}% / ${enStrictPct.toFixed(1)}%`);
  console.log(`AR longest-or-tied / strict: ${arTiePct.toFixed(1)}% / ${arStrictPct.toFixed(1)}%\n`);

  if (errors.length > 0) {
    console.error(`Validation FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log("Question Bank quality verification PASSED: 0 errors.");
  process.exit(0);
}

validateQuestionBankQuality();
