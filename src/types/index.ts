export type Subject = 'Physics' | 'Chemistry' | 'Mathematics';

export type Difficulty = 'Foundational' | 'Intermediate' | 'Advanced';

export interface KeyConcept {
  name: string;
  description: string;
  importance: 'Crucial' | 'Core' | 'High';
}

export interface ImportantFormula {
  name: string;
  latex: string;
  variableBreakdown: string;
}

export interface ImportantDefinition {
  term: string;
  definition: string;
  context: string;
}

export interface PracticalExample {
  title: string;
  scenario: string;
  insight: string;
}

export interface MCQ {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeProblem {
  id: number;
  problem: string;
  difficulty: Difficulty;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface StudyPack {
  title: string;
  subject: Subject;
  estimatedStudyTime: string;
  summary: string;
  keyConcepts: KeyConcept[];
  importantFormulas: ImportantFormula[];
  importantDefinitions: ImportantDefinition[];
  examples: PracticalExample[];
  mcqs: MCQ[];
  practiceProblems: PracticeProblem[];
}

export interface SnapSolveSolutionStep {
  stepNumber: number;
  title: string;
  mathExpression?: string;
  explanation: string;
}

export interface CommonMistake {
  misconception: string;
  whyItFails: string;
  correctAlternative: string;
}

export interface SnapSolveResult {
  detectedSubject: string;
  detectedTopic: string;
  difficulty: Difficulty | string;
  requiredConcepts: string[];
  problemStatement: string;
  stepByStepSolution: SnapSolveSolutionStep[];
  finalAnswer: string;
  commonMistakes: CommonMistake[];
  source?: string;
  inferenceLatencyMs?: number;
}

export interface MistakeDiagnostic {
  diagnosticSummary: string;
  whyThisFeelsIntuitive: string;
  theCoreFallacy: string;
  interactiveTestYourself: string;
  goldenRule: string;
}

export interface SimilarQuestion {
  questionTitle: string;
  question: string;
  conceptTested: string;
  hint: string;
  solution: string;
}

export interface SimpleExplanation {
  analogyTitle: string;
  analogyStory: string;
  threeIntuitions: string[];
  beginnerTakeaway: string;
}

export interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  conceptTested: string;
  explanation: string;
  suggestedRevision: string;
}

export interface WeakConcept {
  id: string;
  subject: Subject;
  conceptName: string;
  accuracyRate: number; // e.g. 42%
  primaryMisconception: string;
  lastTestedDate: string;
}

export interface SubjectProgress {
  subject: Subject;
  masteryPercentage: number;
  topicsCompleted: number;
  totalTopics: number;
  hoursSpent: number;
  trend: 'improving' | 'stable' | 'attention';
  recentTopic: string;
}
