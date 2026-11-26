import { AssessmentQuestion } from '@/lib/assessment/schema';

export const _2d_dp_questions: AssessmentQuestion[] = [
{
  "id": "AL-DP2D-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "2D DP",
  "specialization": "Grid Paths",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When moving only Right or Down on an R×C grid, what is the DP transition for dp[r][c] counting paths from (0,0)?",
    "ar": "عند التحرك لليمين أو للأسفل فقط على شبكة R×C، ما هي معادلة الانتقال لحساب عدد المسارات إلى الخلية (r, c)؟"
  },
  "options": [
    {
      "id": "min",
      "text": {
        "en": "dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + 1",
        "ar": "dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + 1"
      }
    },
    {
      "id": "diag",
      "text": {
        "en": "dp[r][c] = dp[r - 1][c - 1] + 1",
        "ar": "dp[r][c] = dp[r - 1][c - 1] + 1"
      }
    },
    {
      "id": "rd",
      "text": {
        "en": "dp[r][c] = dp[r - 1][c] + dp[r][c - 1]",
        "ar": "dp[r][c] = dp[r - 1][c] + dp[r][c - 1]"
      }
    },
    {
      "id": "all4",
      "text": {
        "en": "dp[r][c] = dp[r - 1][c] * dp[r][c - 1]",
        "ar": "dp[r][c] = dp[r - 1][c] * dp[r][c - 1]"
      }
    }
  ],
  "correctAnswer": "rd",
  "explanation": {
    "en": "A cell (r, c) can only be entered from directly above (r - 1, c) or directly left (r, c - 1), so we sum the ways from both predecessors.",
    "ar": "لا يمكن دخول الخلية (r, c) إلا من الأعلى (r-1, c) أو اليسار (r, c-1)، لذا نجمع عدد مسارات الخليتين السابقتين."
  },
  "tags": [
    "dp",
    "dynamic-programming",
    "grid-dp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-DPR-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "2D DP",
  "specialization": "Grid Paths",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "A robot starts at `(0,0)` on an `R x C` grid moving only RIGHT or DOWN. What transition computes ways `dp[r][c]` cleanly?",
    "ar": "روبوت ينطلق من `(0,0)` على شبكة `R x C` ويتحرك للأسفل أو اليمين فقط. ما معادلة حساب عدد المسارات `dp[r][c]`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "dp[r][c] = min(dp[r - 1][c], dp[r][c - 1])",
        "ar": "dp[r][c] = min(dp[r - 1][c], dp[r][c - 1])"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "dp[r][c] = dp[r - 1][c] + dp[r][c - 1]",
        "ar": "dp[r][c] = dp[r - 1][c] + dp[r][c - 1]"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "dp[r][c] = dp[r - 1][c] * dp[r][c - 1]",
        "ar": "dp[r][c] = dp[r - 1][c] * dp[r][c - 1]"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "dp[r][c] = dp[r + 1][c + 1]",
        "ar": "dp[r][c] = dp[r + 1][c + 1]"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Cell `(r, c)` can only be reached from immediately above `(r-1, c)` or immediately left `(r, c-1)` cleanly, so path counts add!",
    "ar": "لا يُوصل لأي خانة إلا من الخانة التي فوقها أو التي على يسارها، فنجمع عدد طرق الوصول من الجهتين."
  },
  "tags": [
    "2d-dp",
    "grid-paths",
    "dp"
  ]
} as AssessmentQuestion
];
