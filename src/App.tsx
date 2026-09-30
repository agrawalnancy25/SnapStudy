import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { PracticeView } from './components/PracticeView';
import { SnapSolveView } from './components/SnapSolveView';
import { ArchitectureView } from './components/ArchitectureView';
import { PrivacyModal } from './components/PrivacyModal';
import { ExplainSimplyModal } from './components/ExplainSimplyModal';
import { ExplainMistakeModal } from './components/ExplainMistakeModal';
import { SimilarQuestionModal } from './components/SimilarQuestionModal';

import {
  Subject,
  Difficulty,
  StudyPack,
  SnapSolveResult,
  PracticeQuestion,
  WeakConcept,
  MistakeDiagnostic,
  SimilarQuestion,
  SimpleExplanation,
} from './types';

import {
  INITIAL_SUBJECT_PROGRESS,
  INITIAL_WEAK_CONCEPTS,
  INITIAL_CONTINUE_LEARNING,
  SAMPLE_PHYSICS_SOLVE_RESULT,
  SAMPLE_PRACTICE_QUESTIONS,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'learn' | 'practice' | 'snapsolve' | 'architecture'
  >('dashboard');

  // Modals
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isExplainSimplyOpen, setIsExplainSimplyOpen] = useState(false);
  const [isExplainMistakeOpen, setIsExplainMistakeOpen] = useState(false);
  const [isSimilarQuestionOpen, setIsSimilarQuestionOpen] = useState(false);

  // Data states
  const [subjectProgress, setSubjectProgress] = useState(INITIAL_SUBJECT_PROGRESS);
  const [weakConcepts, setWeakConcepts] = useState<WeakConcept[]>(INITIAL_WEAK_CONCEPTS);
  const [continueLearning] = useState(INITIAL_CONTINUE_LEARNING);

  // SnapSolve State
  const [snapSolveResult, setSnapSolveResult] = useState<SnapSolveResult>(SAMPLE_PHYSICS_SOLVE_RESULT);
  const [solvingLoading, setSolvingLoading] = useState(false);

  // Learn Mode State
  const [currentStudyPack, setCurrentStudyPack] = useState<StudyPack>({
    title: 'Thermodynamics: Adiabatic Expansions & First Law',
    subject: 'Physics',
    estimatedStudyTime: '18 mins',
    summary:
      'An adiabatic process is a thermodynamic transformation in which no heat enters or leaves the system (Q = 0). This occurs either through thermal insulation or when a process happens too rapidly for heat to conduct.\n\nBecause heat exchange is zero, any work performed by an expanding gas is drawn directly from its internal thermal energy (ΔU = -W). Consequently, an adiabatic expansion causes the gas temperature to drop, while adiabatic compression forces temperature to rise sharply. The governing equation of state is P·V^γ = constant, where γ = Cp/Cv is the heat capacity ratio.',
    keyConcepts: [
      {
        name: 'The Zero Heat Boundary (Q = 0)',
        description: 'No energy enters or leaves as thermal heat flux. ΔU is coupled directly to mechanical work: ΔU = -W.',
        importance: 'Crucial',
      },
      {
        name: 'Heat Capacity Ratio (γ = Cp / Cv)',
        description:
          'Determines the steepness of the adiabatic curve on a P-V indicator diagram. For monoatomic gas γ ≈ 1.67, for diatomic γ ≈ 1.40.',
        importance: 'Core',
      },
      {
        name: 'Steepness on P-V Indicator Diagram',
        description:
          'Because γ > 1, the slope of an adiabatic curve (dP/dV = -γ P/V) is strictly steeper by a factor of γ than an isothermal curve (dP/dV = -P/V).',
        importance: 'High',
      },
      {
        name: 'Reversible vs Free Adiabatic Expansion',
        description:
          'In reversible expansion against pressure, work is done and temperature drops. In Joule free expansion into a vacuum, W = 0, so ΔT = 0 for an ideal gas.',
        importance: 'Crucial',
      },
    ],
    importantFormulas: [
      {
        name: 'First Law for Adiabatic Systems',
        latex: 'ΔU = -W  =  n · Cᵥ · (T₂ - T₁)',
        variableBreakdown: 'ΔU: Internal energy change (J), W: Work done by gas (J), Cv: Molar heat capacity, n: Moles.',
      },
      {
        name: 'Pressure-Volume Adiabatic Relation',
        latex: 'P₁ · V₁^γ = P₂ · V₂^γ = constant',
        variableBreakdown: 'P: Pressure (Pa), V: Volume (m³), γ: Ratio of specific heats (Cp / Cv).',
      },
      {
        name: 'Temperature-Volume Adiabatic Relation',
        latex: 'T₁ · V₁^(γ - 1) = T₂ · V₂^(γ - 1)',
        variableBreakdown: 'T: Absolute temperature (K), V: Volume (m³).',
      },
    ],
    importantDefinitions: [
      {
        term: 'Adiabatic Invariant',
        definition: 'A physical quantity that remains constant when thermodynamic parameters change slowly and reversibly.',
        context: 'Essential for engine thermodynamic modeling.',
      },
      {
        term: 'Heat Capacity Ratio (Gamma, γ)',
        definition: 'The ratio of molar heat capacity at constant pressure (Cp) to constant volume (Cv).',
        context: 'Calculates the speed of sound and expansion slopes.',
      },
    ],
    examples: [
      {
        title: 'Diesel Engine Auto-Ignition via Rapid Compression',
        scenario: 'Air is compressed 20:1 in milliseconds without spark plugs.',
        insight: 'Adiabatic work elevates temperature past 550°C, instantaneously igniting diesel fuel mist.',
      },
    ],
    mcqs: [
      {
        id: 1,
        question: 'During a reversible adiabatic expansion of an ideal gas, which of the following is true?',
        options: [
          'Work is done by the gas and the temperature drops.',
          'Work is done on the gas and the temperature rises.',
          'No work is done because Q = 0.',
          'Temperature remains strictly constant because energy is conserved.',
        ],
        correctIndex: 0,
        explanation: 'In expansion, W > 0. Since Q = 0, ΔU = -W < 0, meaning internal energy and temperature drop.',
      },
      {
        id: 2,
        question: 'How does the slope of an adiabatic curve on a P-V diagram compare to an isothermal curve?',
        options: [
          'The adiabatic slope is γ times steeper.',
          'The isothermal slope is γ times steeper.',
          'Both slopes are exactly identical.',
          'The adiabatic curve is horizontal.',
        ],
        correctIndex: 0,
        explanation: 'Adiabatic slope dP/dV = -γ P/V is steeper than isothermal dP/dV = -P/V by a factor of γ.',
      },
      {
        id: 3,
        question: 'An ideal gas undergoes free adiabatic expansion into a vacuum. How does its temperature change?',
        options: [
          'It remains unchanged (ΔT = 0).',
          'It drops significantly.',
          'It rises due to turbulence.',
          'It drops to absolute zero.',
        ],
        correctIndex: 0,
        explanation: 'Into a vacuum, P_ext = 0 so W = 0. Since Q = 0, ΔU = 0, hence ΔT = 0 for an ideal gas.',
      },
      {
        id: 4,
        question: 'For a monoatomic ideal gas, what is the theoretical value of γ?',
        options: ['1.67 (5/3)', '1.40 (7/5)', '1.33 (4/3)', '1.00'],
        correctIndex: 0,
        explanation: 'Cv = 3/2 R, Cp = 5/2 R, so γ = Cp/Cv = (5/2)/(3/2) = 5/3 ≈ 1.67.',
      },
      {
        id: 5,
        question: 'Why does air escaping a bicycle tire feel cold to the touch?',
        options: [
          'The rapidly escaping air expands adiabatically and performs work on atmospheric air.',
          'The rubber tire valve produces refrigeration chemicals.',
          'Air molecules lose mass as pressure drops.',
          'Nitrogen undergoes an endothermic phase shift into liquid.',
        ],
        correctIndex: 0,
        explanation: 'The venting gas expands rapidly against atmospheric air (Q ≈ 0, W > 0), extracting internal heat.',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        problem: 'Two moles of an ideal diatomic gas (γ = 1.40) initially at 350 K expand adiabatically to double their volume. Calculate final temperature.',
        difficulty: 'Foundational',
        solutionSteps: [
          'Use T₁·V₁^(γ-1) = T₂·V₂^(γ-1)',
          'T₂ = T₁ · (V₁ / V₂)^(γ-1) = 350 · (1/2)^0.40',
          '350 × 0.7578 ≈ 265.2 K',
        ],
        finalAnswer: '265.2 K (-7.95 °C)',
      },
      {
        id: 2,
        problem: 'Calculate the total work done by 1 mole of helium (γ = 5/3) expanding adiabatically from P₁ = 500 kPa, V₁ = 2.0 L to P₂ = 100 kPa.',
        difficulty: 'Intermediate',
        solutionSteps: [
          'Find final volume V₂ = 5.253 L using P₁V₁^γ = P₂V₂^γ',
          'W = (P₁V₁ - P₂V₂) / (γ - 1)',
          'W = (1000 - 525.3) / (2/3) = 712.05 J',
        ],
        finalAnswer: '712.1 Joules of work performed by the gas',
      },
      {
        id: 3,
        problem: 'A cylinder with adiabatic walls contains an ideal gas. A non-conducting piston of mass M oscillates and damps. Prove ΔS > 0.',
        difficulty: 'Advanced',
        solutionSteps: [
          'Boundary heat exchange is zero (dQ_ext = 0)',
          'Piston oscillations damp due to internal gas friction and wall shear',
          'Bulk mechanical motion dissipates into random thermal motion (dS_internal > 0)',
        ],
        finalAnswer: 'Irreversible viscous dissipation generates positive internal entropy (ΔS > 0)',
      },
    ],
  });
  const [learnLoading, setLearnLoading] = useState(false);

  // Practice Mode State
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>(
    SAMPLE_PRACTICE_QUESTIONS.Physics
  );
  const [practiceLoading, setPracticeLoading] = useState(false);

  // Explain Simply State
  const [simpleExplanation, setSimpleExplanation] = useState<SimpleExplanation | null>(null);
  const [simplyLoading, setSimplyLoading] = useState(false);
  const [activeConceptTitle, setActiveConceptTitle] = useState('Adiabatic Thermodynamics');

  // Explain Mistake State
  const [mistakeDiagnostic, setMistakeDiagnostic] = useState<MistakeDiagnostic | null>(null);
  const [mistakeLoading, setMistakeLoading] = useState(false);

  // Similar Question State
  const [similarQuestion, setSimilarQuestion] = useState<SimilarQuestion | null>(null);
  const [similarLoading, setSimilarLoading] = useState(false);

  // Handlers for SnapSolve
  const handleSolveQuestion = async (text?: string, imageBase64?: string) => {
    setSolvingLoading(true);
    try {
      const res = await fetch('/api/snapsolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionText: text, imageBase64 }),
      });
      const data = await res.json();
      setSnapSolveResult(data);
    } catch (err) {
      console.warn('SnapSolve fetch error:', err);
    } finally {
      setSolvingLoading(false);
    }
  };

  // Handlers for Learn Mode Study Pack
  const handleGenerateStudyPack = async (materialText: string, subject: Subject, topic: string) => {
    setLearnLoading(true);
    try {
      const res = await fetch('/api/generate-studypack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialText, subject, topic }),
      });
      const data = await res.json();
      setCurrentStudyPack(data);
    } catch (err) {
      console.warn('Study pack fetch error:', err);
    } finally {
      setLearnLoading(false);
    }
  };

  // Handler for Explain Simply
  const handleExplainSimply = async (concept: string, context: string) => {
    setActiveConceptTitle(concept);
    setIsExplainSimplyOpen(true);
    setSimplyLoading(true);
    try {
      const res = await fetch('/api/explain-simply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, context }),
      });
      const data = await res.json();
      setSimpleExplanation(data);
    } catch (err) {
      console.warn('Explain simply fetch error:', err);
    } finally {
      setSimplyLoading(false);
    }
  };

  // Handler for Explain My Mistake
  const handleOpenExplainMistake = async (customAttempt?: string) => {
    setIsExplainMistakeOpen(true);
    setMistakeLoading(true);
    try {
      const res = await fetch('/api/explain-mistake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionContext: snapSolveResult.problemStatement,
          studentAttempt: customAttempt || 'I assumed temperature stays constant because Q = 0',
        }),
      });
      const data = await res.json();
      setMistakeDiagnostic(data);
    } catch (err) {
      console.warn('Explain mistake fetch error:', err);
    } finally {
      setMistakeLoading(false);
    }
  };

  // Handler for Generate Similar Question
  const handleOpenGenerateSimilar = async () => {
    setIsSimilarQuestionOpen(true);
    setSimilarLoading(true);
    try {
      const res = await fetch('/api/generate-similar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalTopic: snapSolveResult.detectedTopic,
          originalQuestion: snapSolveResult.problemStatement,
        }),
      });
      const data = await res.json();
      setSimilarQuestion(data);
    } catch (err) {
      console.warn('Generate similar fetch error:', err);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Handler for Practice Questions Generator
  const handleGenerateQuestions = async (subject: Subject, topic: string, difficulty: Difficulty) => {
    setPracticeLoading(true);
    try {
      const res = await fetch('/api/generate-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topic, difficulty }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setPracticeQuestions(data.questions);
      }
    } catch (err) {
      console.warn('Practice generation fetch error:', err);
    } finally {
      setPracticeLoading(false);
    }
  };

  // Jump from Weak Concept to practice/diagnostic
  const handleSelectWeakConcept = (concept: WeakConcept) => {
    if (concept.subject === 'Physics') {
      setActiveTab('snapsolve');
    } else {
      setActiveTab('practice');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-rose-500/20 selection:text-rose-200">
      {/* Navigation Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Main View Port Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectWeakConcept={handleSelectWeakConcept}
            subjectProgress={subjectProgress}
            weakConcepts={weakConcepts}
            continueLearning={continueLearning}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView
            currentStudyPack={currentStudyPack}
            onGenerateStudyPack={handleGenerateStudyPack}
            onExplainSimply={handleExplainSimply}
            loading={learnLoading}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            onGenerateQuestions={handleGenerateQuestions}
            questions={practiceQuestions}
            loading={practiceLoading}
            onNavigateToLearn={() => setActiveTab('learn')}
          />
        )}

        {activeTab === 'snapsolve' && (
          <SnapSolveView
            currentResult={snapSolveResult}
            onSolveQuestion={handleSolveQuestion}
            onOpenExplainMistake={() => handleOpenExplainMistake()}
            onOpenGenerateSimilar={handleOpenGenerateSimilar}
            loading={solvingLoading}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      <ExplainSimplyModal
        isOpen={isExplainSimplyOpen}
        onClose={() => setIsExplainSimplyOpen(false)}
        explanation={simpleExplanation}
        loading={simplyLoading}
        conceptName={activeConceptTitle}
      />

      <ExplainMistakeModal
        isOpen={isExplainMistakeOpen}
        onClose={() => setIsExplainMistakeOpen(false)}
        diagnostic={mistakeDiagnostic}
        loading={mistakeLoading}
        onDiagnoseCustom={(custom) => handleOpenExplainMistake(custom)}
      />

      <SimilarQuestionModal
        isOpen={isSimilarQuestionOpen}
        onClose={() => setIsSimilarQuestionOpen(false)}
        similarQuestion={similarQuestion}
        loading={similarLoading}
        onRegenerate={handleOpenGenerateSimilar}
      />

      {/* Subtle Hardware Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050810] py-6 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">SnapStudy</span>
            <span className="text-slate-600">·</span>
            <span>Private AI that learns how you learn</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Designed for Snapdragon-Powered HP PCs</span>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-slate-400 hover:text-slate-200 transition-colors underline"
            >
              Privacy Architecture
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
