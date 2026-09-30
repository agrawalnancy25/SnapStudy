import { SubjectProgress, WeakConcept, StudyPack, SnapSolveResult, PracticeQuestion } from '../types';

export const INITIAL_SUBJECT_PROGRESS: SubjectProgress[] = [
  {
    subject: 'Physics',
    masteryPercentage: 74,
    topicsCompleted: 14,
    totalTopics: 18,
    hoursSpent: 28.5,
    trend: 'attention',
    recentTopic: 'Thermodynamics & Adiabatic Work',
  },
  {
    subject: 'Chemistry',
    masteryPercentage: 86,
    topicsCompleted: 19,
    totalTopics: 22,
    hoursSpent: 34.0,
    trend: 'improving',
    recentTopic: 'Aromaticity & Reaction Kinetics',
  },
  {
    subject: 'Mathematics',
    masteryPercentage: 92,
    topicsCompleted: 24,
    totalTopics: 26,
    hoursSpent: 41.5,
    trend: 'improving',
    recentTopic: 'Multivariable Integration & Green’s Theorem',
  },
];

export const INITIAL_WEAK_CONCEPTS: WeakConcept[] = [
  {
    id: 'wc-1',
    subject: 'Physics',
    conceptName: 'Adiabatic vs Isothermal Work (ΔU = -W)',
    accuracyRate: 42,
    primaryMisconception: 'Assuming Q = 0 implies temperature stays constant (confusing heat with temperature).',
    lastTestedDate: '2 hours ago',
  },
  {
    id: 'wc-2',
    subject: 'Chemistry',
    conceptName: 'Electrophilic Substitution vs Addition in Arenes',
    accuracyRate: 58,
    primaryMisconception: 'Forgetting aromatic sextet stabilization energy penalty when double bonds break.',
    lastTestedDate: 'Yesterday',
  },
  {
    id: 'wc-3',
    subject: 'Mathematics',
    conceptName: 'Integration by Parts: Differential Form Assignment',
    accuracyRate: 64,
    primaryMisconception: 'Inverting LIATE order for inverse trigonometric and algebraic combinations.',
    lastTestedDate: '3 days ago',
  },
];

export const INITIAL_CONTINUE_LEARNING = [
  {
    id: 'cl-1',
    subject: 'Physics' as const,
    title: 'Adiabatic Cycles, Heat Engines & Carnot Efficiency',
    progress: 68,
    estTime: '12 min left',
    summary: 'Master P-V indicator slopes, reversible expansion work, and entropy generation in isolated gas cylinders.',
  },
  {
    id: 'cl-2',
    subject: 'Chemistry' as const,
    title: 'Thermodynamic vs Kinetic Enolate Formations',
    progress: 45,
    estTime: '20 min left',
    summary: 'Steric hindrance vs bond stability at low temperatures (-78°C LDA vs reflux conditions).',
  },
  {
    id: 'cl-3',
    subject: 'Mathematics' as const,
    title: 'Differential Equations: Integrating Factor Method',
    progress: 88,
    estTime: '8 min left',
    summary: 'Solving dy/dx + P(x)y = Q(x) using e^(∫P(x)dx) with boundary values.',
  },
];

export const SAMPLE_PHYSICS_QUESTION =
  'A gas expands adiabatically from volume V1 to V2. Explain how the temperature changes.';

export const SAMPLE_PHYSICS_SOLVE_RESULT: SnapSolveResult = {
  detectedSubject: 'Physics',
  detectedTopic: 'Thermodynamics & Adiabatic Expansions',
  difficulty: 'Intermediate',
  requiredConcepts: [
    'First Law of Thermodynamics: ΔU = Q - W',
    'Adiabatic Process Constraint: Q = 0',
    'Ideal Gas Equipartition & Internal Energy: U = n·Cv·T',
    'Boundary Expansion Work: W = ∫ P dV > 0',
    'Reversible Adiabatic Equation: T · V^(γ - 1) = const',
  ],
  problemStatement:
    'A gas expands adiabatically from volume V1 to V2 (where V2 > V1). Explain how the temperature of the gas changes.',
  stepByStepSolution: [
    {
      stepNumber: 1,
      title: 'State the First Law of Thermodynamics',
      mathExpression: 'ΔU = Q - W',
      explanation:
        'The net change in internal energy (ΔU) is the net heat transferred into the system (Q) minus the mechanical work performed by the system on its surroundings (W).',
    },
    {
      stepNumber: 2,
      title: 'Apply the Adiabatic Isolation Condition',
      mathExpression: 'Q = 0  ⟹  ΔU = -W',
      explanation:
        'Because the process is adiabatic, there is zero heat transfer between the gas and its surroundings (Q = 0). The gas is thermally isolated.',
    },
    {
      stepNumber: 3,
      title: 'Determine the Sign of Mechanical Work',
      mathExpression: 'W = ∫_{V₁}^{V₂} P dV > 0  (since V₂ > V₁)',
      explanation:
        'As the gas volume expands from V1 to V2 against an opposing external boundary, the gas performs positive mechanical work on its surroundings.',
    },
    {
      stepNumber: 4,
      title: 'Connect Internal Energy to Absolute Temperature',
      mathExpression: 'ΔU = n · Cᵥ · ΔT = -W < 0  ⟹  ΔT < 0',
      explanation:
        'For an ideal gas, internal thermal energy is strictly proportional to absolute temperature. Because the gas performs positive work while Q = 0, this work is extracted directly from the kinetic energy of its molecules. Consequently, ΔU < 0, meaning the temperature must decrease (T2 < T1).',
    },
    {
      stepNumber: 5,
      title: 'Analytical State Equation Verification',
      mathExpression: 'T₂ = T₁ · (V₁ / V₂)^(γ - 1)  <  T₁',
      explanation:
        'For a reversible adiabatic expansion with specific heat ratio γ > 1: because V2 > V1, the ratio (V1/V2) < 1, confirming mathematically that T2 < T1.',
    },
  ],
  finalAnswer:
    'The temperature of the gas decreases (it cools down). Since no heat is permitted to enter the system (Q = 0), the energy needed to do positive expansion work on the external boundary is supplied entirely by the gas’s own internal thermal energy.',
  commonMistakes: [
    {
      misconception: 'Assuming temperature stays constant because "no heat enters or leaves the gas"',
      whyItFails:
        'Conflates heat (energy transferred across a boundary) with temperature (average molecular kinetic energy). Work is another mode of energy transfer.',
      correctAlternative:
        'Recognize that doing work exhausts the gas’s internal energy reserve, lowering molecular speed and therefore temperature.',
    },
    {
      misconception: 'Applying Boyle’s Law (P1·V1 = P2·V2)',
      whyItFails:
        'Boyle’s Law holds ONLY when temperature is held strictly constant (isothermal process). For adiabatic systems, pressure drops more steeply: P·V^γ = constant.',
      correctAlternative: 'Use P·V^γ = constant or T·V^(γ-1) = constant.',
    },
    {
      misconception: 'Assuming all adiabatic expansions produce cooling (overlooking Joule Free Expansion)',
      whyItFails:
        'If a gas expands into a complete vacuum (free expansion), external opposing pressure is zero, so W = 0 and ΔT = 0 for ideal gases.',
      correctAlternative:
        'Always check if the gas is pushing against external pressure (W > 0 ⟹ cools) or expanding into a vacuum (W = 0 ⟹ ΔT = 0).',
    },
  ],
  source: 'SnapStudy On-Device AI Engine (Hexagon NPU 45 TOPS)',
  inferenceLatencyMs: 38,
};

export const SAMPLE_PRACTICE_QUESTIONS: Record<string, PracticeQuestion[]> = {
  Physics: [
    {
      id: 1,
      question: 'A gas expands adiabatically from volume V1 to V2. How does the temperature change?',
      options: [
        'Decreases (cools down) because the gas performs work at the expense of internal energy',
        'Remains constant because Q = 0',
        'Increases because pressure decreases',
        'Increases because molecules gain kinetic energy during expansion',
      ],
      correctIndex: 0,
      conceptTested: 'First Law of Thermodynamics & Adiabatic Work (ΔU = -W)',
      explanation:
        'Because Q = 0, ΔU = -W. When the gas expands, W > 0, so ΔU < 0. For an ideal gas ΔU = nCvΔT, so ΔT < 0, meaning temperature drops.',
      suggestedRevision: 'Thermodynamics: First Law & Adiabatic vs Isothermal Processes',
    },
    {
      id: 2,
      question: 'How does the slope of a reversible adiabatic curve compare to an isothermal curve on a P-V diagram?',
      options: [
        'The adiabatic slope is γ times steeper (dP/dV = -γ·P/V)',
        'The isothermal slope is γ times steeper',
        'Both curves have identical slope at every point of intersection',
        'The adiabatic curve is completely horizontal',
      ],
      correctIndex: 0,
      conceptTested: 'Indicator Diagrams & Heat Capacity Ratio (γ = Cp / Cv)',
      explanation:
        'Differentiating P·V^γ = const gives dP/dV = -γ(P/V). For isothermal P·V = const, dP/dV = -P/V. Since γ > 1, the adiabatic curve is steeper.',
      suggestedRevision: 'P-V Diagrams: Reversible Work and Curve Slopes',
    },
    {
      id: 3,
      question: 'When an ideal gas undergoes a free Joule expansion into a vacuum chamber with adiabatic walls, what are W and ΔT?',
      options: [
        'W = 0 and ΔT = 0',
        'W > 0 and ΔT < 0',
        'W < 0 and ΔT > 0',
        'W = 0 and ΔT < 0',
      ],
      correctIndex: 0,
      conceptTested: 'Free Expansion (Joule Effect) in Thermally Isolated Containers',
      explanation:
        'Against a vacuum, opposing pressure P_ext = 0, so work W = ∫ P_ext dV = 0. Since Q = 0, ΔU = 0, and since U = f(T) for an ideal gas, ΔT = 0.',
      suggestedRevision: 'Internal Energy Dependence on Volume: Real vs Ideal Gases',
    },
    {
      id: 4,
      question: 'In a diesel engine cylinder, air is rapidly compressed without a spark plug. Why does the air ignite fuel?',
      options: [
        'Rapid compression is adiabatic (Q ≈ 0); high mechanical work raises air temperature above 550°C',
        'Friction between air molecules creates sparks',
        'External heat from the cooling radiator floods the chamber',
        'Oxygen molecules undergo spontaneous nuclear fusion under pressure',
      ],
      correctIndex: 0,
      conceptTested: 'Adiabatic Compression: Mechanical Work Converting to Thermal Energy',
      explanation:
        'During fast compression, work is done on the gas (W_by < 0, so ΔU > 0). With no time for heat to escape, internal energy surges and temperature spikes past autoignition threshold.',
      suggestedRevision: 'Practical Thermodynamic Cycles: Diesel & Otto Cycles',
    },
  ],
  Chemistry: [
    {
      id: 1,
      question: 'Why does benzene undergo electrophilic aromatic substitution rather than addition reactions?',
      options: [
        'Substitution retains the continuous 6-electron aromatic resonance stabilization (~150 kJ/mol)',
        'Addition reactions are strictly endothermic for all alkenes and alkynes',
        'Benzene carbons are sp³ hybridized and cannot bond to electrophiles',
        'The pi-electron density in benzene is zero',
      ],
      correctIndex: 0,
      conceptTested: 'Aromaticity & Hückel’s 4n+2 Pi-Electron Delocalization',
      explanation:
        'Addition disrupts the cyclic conjugated 6 pi-electron system, destroying aromaticity. Substitution regenerates the aromatic sextet in the deprotonation step.',
      suggestedRevision: 'Organic Chemistry: Electrophilic Aromatic Substitution (EAS)',
    },
    {
      id: 2,
      question: 'According to Le Chatelier’s principle, what occurs if the temperature of the exothermic Haber reaction (N2 + 3H2 ⇌ 2NH3 + 92 kJ) is raised?',
      options: [
        'Equilibrium shifts in the endothermic reverse direction, decreasing ammonia yield',
        'Equilibrium shifts forward to generate even more heat',
        'The equilibrium constant Keq increases dramatically',
        'The reaction stops entirely because nitrogen denatures',
      ],
      correctIndex: 0,
      conceptTested: 'Le Chatelier’s Principle & Temperature Dependence of Equilibrium',
      explanation:
        'Adding thermal energy shifts an exothermic reaction toward the reactants (endothermic direction) to absorb the excess heat, reducing the equilibrium value of Keq.',
      suggestedRevision: 'Chemical Equilibrium: van ’t Hoff Equation & Dynamic Response',
    },
  ],
  Mathematics: [
    {
      id: 1,
      question: 'When evaluating ∫ x · e^(2x) dx using integration by parts, what is the best choice for u and dv under the LIATE rule?',
      options: [
        'u = x,  dv = e^(2x) dx',
        'u = e^(2x),  dv = x dx',
        'u = x · e^(2x),  dv = dx',
        'u = 1,  dv = x · e^(2x) dx',
      ],
      correctIndex: 0,
      conceptTested: 'Integration by Parts: Selection of u and dv using LIATE',
      explanation:
        'Algebraic terms (x) come before Exponential terms (e^(2x)). Differentiating u = x gives du = dx, which simplifies the remaining integral ∫ v du.',
      suggestedRevision: 'Calculus: Integration by Parts & LIATE Strategy',
    },
    {
      id: 2,
      question: 'What is the limit of (sin 3x) / x as x approaches 0?',
      options: ['3', '1', '0', 'Undefined / Infinity'],
      correctIndex: 0,
      conceptTested: 'Trigonometric Limits & Small-Angle Approximations',
      explanation:
        'lim_{x→0} [sin(3x) / x] = 3 · lim_{3x→0} [sin(3x) / 3x] = 3 · (1) = 3.',
      suggestedRevision: 'Limits: Special Trigonometric Limits & Squeeze Theorem',
    },
  ],
};
