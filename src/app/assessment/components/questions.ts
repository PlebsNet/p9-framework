import { Dimension } from "@/lib/archetypeCentroids";

interface Triple {
  id: number;
  subject: {
    label: string;
    id: number;
  };
  predicate: {
    label: string;
    id: number;
  };
  object: {
    label: string;
    id: number;
  };
}

export interface Question {
  id: string;
  text: string;
  dimensions: Dimension[]; // replaces 'dimension'
  reverse?: boolean;
  weight?: number;
  questionId: number;
  triple: Triple;
}

export const questions: Question[] = [
  // --- HEXACO Traits (4 items each) ---
  // Honesty–Humility
  {
    id: "hh_1",
    text: "I rarely manipulate others to achieve my goals.",
    dimensions: ["Honesty-Humility"],
    questionId: 1,
    triple: {
      id: 24465,
      subject: { label: "I", id: 24343 },
      predicate: { label: "manipulate", id: 24344 },
      object: { label: "others for goals", id: 24345 },
    },
  },
  {
    id: "hh_2",
    text: "I strongly value honesty, even if it's costly.",
    dimensions: ["Honesty-Humility"],
    questionId: 2,
    triple: {
      id: 24466,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "honesty", id: 24347 },
    },
  },
  {
    id: "hh_3",
    text: "I'm uncomfortable pretending to be something I'm not.",
    dimensions: ["Honesty-Humility"],
    questionId: 3,
    triple: {
      id: 24467,
      subject: { label: "I", id: 24343 },
      predicate: { label: "avoid", id: 24348 },
      object: { label: "pretending", id: 24349 },
    },
  },
  {
    id: "hh_4",
    text: "I am modest about my achievements.",
    dimensions: ["Honesty-Humility"],
    questionId: 4,
    triple: {
      id: 24468,
      subject: { label: "I", id: 24343 },
      predicate: { label: "display", id: 24350 },
      object: { label: "modesty", id: 24351 },
    },
  },

  // Emotionality
  {
    id: "emotionality_1",
    text: "I easily sense other people's emotions.",
    dimensions: ["Emotionality"],
    questionId: 5,
    triple: {
      id: 24469,
      subject: { label: "I", id: 24343 },
      predicate: { label: "sense", id: 24352 },
      object: { label: "people's emotions", id: 24353 },
    },
  },
  {
    id: "emotionality_2",
    text: "I frequently feel anxious or worried.",
    dimensions: ["Emotionality"],
    questionId: 6,
    triple: {
      id: 24470,
      subject: { label: "I", id: 24343 },
      predicate: { label: "experience", id: 24354 },
      object: { label: "anxiety", id: 24355 },
    },
  },
  {
    id: "emotionality_3",
    text: "I deeply empathize with others' struggles.",
    dimensions: ["Emotionality"],
    questionId: 7,
    triple: {
      id: 24471,
      subject: { label: "I", id: 24343 },
      predicate: { label: "empathize", id: 24356 },
      object: { label: "with others", id: 24357 },
    },
  },
  {
    id: "emotionality_4",
    text: "I become emotional easily.",
    dimensions: ["Emotionality"],
    questionId: 8,
    triple: {
      id: 24472,
      subject: { label: "I", id: 24343 },
      predicate: { label: "experience", id: 24354 },
      object: { label: "emotion", id: 24358 },
    },
  },

  // Extraversion
  {
    id: "extraversion_1",
    text: "I feel energized by social activities.",
    dimensions: ["Extraversion"],
    questionId: 9,
    triple: {
      id: 24473,
      subject: { label: "I", id: 24343 },
      predicate: { label: "feel energized by", id: 24359 },
      object: { label: "social activities", id: 24360 },
    },
  },
  {
    id: "extraversion_2",
    text: "I prefer being around people rather than alone.",
    dimensions: ["Extraversion"],
    questionId: 10,
    triple: {
      id: 24474,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "company", id: 24361 },
    },
  },
  {
    id: "extraversion_3",
    text: "I'm outgoing and sociable.",
    dimensions: ["Extraversion"],
    questionId: 11,
    triple: {
      id: 24475,
      subject: { label: "I", id: 24343 },
      predicate: { label: "display", id: 24350 },
      object: { label: "outgoing sociability", id: 24362 },
    },
  },
  {
    id: "extraversion_4",
    text: "Social interactions make me feel good.",
    dimensions: ["Extraversion"],
    questionId: 12,
    triple: {
      id: 24476,
      subject: { label: "I", id: 24343 },
      predicate: { label: "enjoy", id: 24363 },
      object: { label: "social interaction", id: 24364 },
    },
  },

  // Agreeableness
  {
    id: "agreeableness_1",
    text: "I usually forgive others quickly.",
    dimensions: ["Agreeableness"],
    questionId: 13,
    triple: {
      id: 24477,
      subject: { label: "I", id: 24343 },
      predicate: { label: "forgive", id: 24365 },
      object: { label: "others", id: 24366 },
    },
  },
  {
    id: "agreeableness_2",
    text: "I find it easy to cooperate with others.",
    dimensions: ["Agreeableness"],
    questionId: 14,
    triple: {
      id: 24478,
      subject: { label: "I", id: 24343 },
      predicate: { label: "cooperate", id: 24367 },
      object: { label: "with others", id: 24357 },
    },
  },
  {
    id: "agreeableness_3",
    text: "I avoid conflicts when possible.",
    dimensions: ["Agreeableness"],
    questionId: 15,
    triple: {
      id: 24479,
      subject: { label: "I", id: 24343 },
      predicate: { label: "avoid", id: 24348 },
      object: { label: "conflicts", id: 24368 },
    },
  },
  {
    id: "agreeableness_4",
    text: "I'm patient and understanding.",
    dimensions: ["Agreeableness"],
    questionId: 16,
    triple: {
      id: 24480,
      subject: { label: "I", id: 24343 },
      predicate: { label: "display", id: 24350 },
      object: { label: "patience", id: 24369 },
    },
  },

  // Conscientiousness
  {
    id: "conscientiousness_1",
    text: "I'm highly organized in daily life.",
    dimensions: ["Conscientiousness"],
    questionId: 17,
    triple: {
      id: 24481,
      subject: { label: "I", id: 24343 },
      predicate: { label: "maintain", id: 24370 },
      object: { label: "organization", id: 24371 },
    },
  },
  {
    id: "conscientiousness_2",
    text: "I plan my tasks carefully before starting.",
    dimensions: ["Conscientiousness"],
    questionId: 18,
    triple: {
      id: 24482,
      subject: { label: "I", id: 24343 },
      predicate: { label: "plan", id: 24372 },
      object: { label: "tasks", id: 24374 },
    },
  },
  {
    id: "conscientiousness_3",
    text: "I'm disciplined in achieving my goals.",
    dimensions: ["Conscientiousness"],
    questionId: 19,
    triple: {
      id: 24483,
      subject: { label: "I", id: 24343 },
      predicate: { label: "apply", id: 24408 },
      object: { label: "discipline", id: 24409 },
    },
  },
  {
    id: "conscientiousness_4",
    text: "I consistently complete tasks I start.",
    dimensions: ["Conscientiousness"],
    questionId: 20,
    triple: {
      id: 24484,
      subject: { label: "I", id: 24343 },
      predicate: { label: "complete", id: 24410 },
      object: { label: "tasks", id: 24374 },
    },
  },

  // Openness
  {
    id: "openness_1",
    text: "I'm fascinated by new ideas and innovations.",
    dimensions: ["Openness"],
    questionId: 21,
    triple: {
      id: 24485,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "new ideas", id: 24375 },
    },
  },
  {
    id: "openness_2",
    text: "I actively seek out creative experiences.",
    dimensions: ["Openness"],
    questionId: 22,
    triple: {
      id: 24486,
      subject: { label: "I", id: 24343 },
      predicate: { label: "seek", id: 24376 },
      object: { label: "creative experiences", id: 24377 },
    },
  },
  {
    id: "openness_3",
    text: "I often think about abstract concepts.",
    dimensions: ["Openness"],
    questionId: 23,
    triple: {
      id: 24487,
      subject: { label: "I", id: 24343 },
      predicate: { label: "think about", id: 24378 },
      object: { label: "abstract concepts", id: 24379 },
    },
  },
  {
    id: "openness_4",
    text: "I enjoy exploring unfamiliar places or topics.",
    dimensions: ["Openness"],
    questionId: 24,
    triple: {
      id: 24488,
      subject: { label: "I", id: 24343 },
      predicate: { label: "explore", id: 24380 },
      object: { label: "new topics", id: 24381 },
    },
  },

  // --- Cognitive Styles (4 items each) ---
  // Analytical Thinking
  {
    id: "analytical_1",
    text: "I trust my intuition more than detailed analysis.",
    dimensions: ["Analytical"],
    reverse: true,
    questionId: 25,
    triple: {
      id: 24489,
      subject: { label: "I", id: 24343 },
      predicate: { label: "trust", id: 24382 },
      object: { label: "intuition", id: 24383 },
    },
  },
  {
    id: "analytical_2",
    text: "I carefully analyze situations before deciding.",
    dimensions: ["Analytical"],
    questionId: 26,
    triple: {
      id: 24490,
      subject: { label: "I", id: 24343 },
      predicate: { label: "analyze", id: 24383 },
      object: { label: "situations", id: 24385 },
    },
  },
  {
    id: "analytical_3",
    text: "I rely on logic more than gut feelings.",
    dimensions: ["Analytical"],
    questionId: 27,
    triple: {
      id: 24491,
      subject: { label: "I", id: 24343 },
      predicate: { label: "rely on", id: 24386 },
      object: { label: "logic", id: 24387 },
    },
  },
  {
    id: "analytical_4",
    text: "Creative ideas often guide my decisions.",
    dimensions: ["Analytical"],
    reverse: true,
    questionId: 28,
    triple: {
      id: 24492,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am guided by", id: 24388 },
      object: { label: "creative ideas", id: 24411 },
    },
  },

  // Pragmatic vs Idealistic
  {
    id: "pragmatic_1",
    text: "I value practical outcomes over ideals.",
    dimensions: ["Pragmatic"],
    questionId: 29,
    triple: {
      id: 24493,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "outcomes", id: 24412 },
    },
  },
  {
    id: "pragmatic_2",
    text: "My decisions are grounded in reality, not dreams.",
    dimensions: ["Pragmatic"],
    questionId: 30,
    triple: {
      id: 24494,
      subject: { label: "I", id: 24343 },
      predicate: { label: "ground", id: 24413 },
      object: { label: "decisions in reality", id: 24414 },
    },
  },
  {
    id: "pragmatic_3",
    text: "I prefer realism over idealism in most situations.",
    dimensions: ["Pragmatic"],
    questionId: 31,
    triple: {
      id: 24495,
      subject: { label: "I", id: 24343 },
      predicate: { label: "prefer", id: 24415 },
      object: { label: "realism", id: 24421 },
    },
  },
  {
    id: "pragmatic_4",
    text: "My values guide my actions more than practical results.",
    dimensions: ["Pragmatic"],
    reverse: true,
    questionId: 32,
    triple: {
      id: 24496,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "values", id: 24422 },
    },
  },

  // Strategic vs Tactical
  {
    id: "strategic_1",
    text: "I think strategically and long-term.",
    dimensions: ["Strategic"],
    questionId: 33,
    triple: {
      id: 24497,
      subject: { label: "I", id: 24343 },
      predicate: { label: "think", id: 24423 },
      object: { label: "strategically", id: 24424 },
    },
  },
  {
    id: "strategic_2",
    text: "I'm good at immediate problem-solving.",
    dimensions: ["Strategic"],
    reverse: true,
    questionId: 34,
    triple: {
      id: 24498,
      subject: { label: "I", id: 24343 },
      predicate: { label: "solve", id: 24425 },
      object: { label: "problems", id: 24426 },
    },
  },
  {
    id: "strategic_3",
    text: "I often plan years ahead.",
    dimensions: ["Strategic"],
    questionId: 35,
    triple: {
      id: 24499,
      subject: { label: "I", id: 24343 },
      predicate: { label: "plan", id: 24372 },
      object: { label: "ahead", id: 24373 },
    },
  },
  {
    id: "strategic_4",
    text: "I prefer quick and adaptable solutions.",
    dimensions: ["Strategic"],
    reverse: true,
    questionId: 36,
    triple: {
      id: 24500,
      subject: { label: "I", id: 24343 },
      predicate: { label: "prefer", id: 24415 },
      object: { label: "quick solutions", id: 24416 },
    },
  },

  // --- Motivational Drivers (by category) ---
  // Intrinsic Motivation
  {
    id: "intrinsic_autonomy",
    text: "I strongly value my independence and freedom.",
    dimensions: ["Intrinsic"],
    questionId: 37,
    triple: {
      id: 24501,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "freedom", id: 24417 },
    },
  },
  {
    id: "intrinsic_competence",
    text: "Feeling competent and skilled matters greatly to me.",
    dimensions: ["Intrinsic"],
    questionId: 38,
    triple: {
      id: 24502,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "feeling competent", id: 24418 },
    },
  },
  {
    id: "intrinsic_relatedness",
    text: "Having meaningful relationships motivates me.",
    dimensions: ["Intrinsic"],
    questionId: 39,
    triple: {
      id: 24503,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am motivated by", id: 24419 },
      object: { label: "relationships", id: 24420 },
    },
  },

  // Extrinsic Motivation
  {
    id: "extrinsic_recognition",
    text: "Recognition from others significantly motivates me.",
    dimensions: ["Extrinsic"],
    questionId: 40,
    triple: {
      id: 24504,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am motivated by", id: 24419 },
      object: { label: "recognition", id: 24427 },
    },
  },
  {
    id: "extrinsic_status",
    text: "Achieving status and success drives many of my decisions.",
    dimensions: ["Extrinsic"],
    questionId: 41,
    triple: {
      id: 24505,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am driven by", id: 24428 },
      object: { label: "status", id: 24429 },
    },
  },
  {
    id: "extrinsic_security",
    text: "I highly value financial security.",
    dimensions: ["Extrinsic"],
    questionId: 42,
    triple: {
      id: 24506,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "security", id: 24430 },
    },
  },

  // Personal Values
  {
    id: "value_creativity",
    text: "Creativity and innovation are core parts of who I am.",
    dimensions: ["Values", "Openness"],
    questionId: 43,
    triple: {
      id: 24507,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "creativity", id: 24431 },
    },
  },
  {
    id: "value_stability",
    text: "A stable, predictable life is essential to my happiness.",
    dimensions: ["Values"],
    questionId: 44,
    triple: {
      id: 24508,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "stability", id: 24432 },
    },
  },
  {
    id: "value_adventure",
    text: "I actively seek adventure and excitement.",
    dimensions: ["Values", "Openness"],
    questionId: 45,
    triple: {
      id: 24509,
      subject: { label: "I", id: 24343 },
      predicate: { label: "seek", id: 24376 },
      object: { label: "adventure", id: 24433 },
    },
  },
  {
    id: "value_community",
    text: "Community and relationships are central to my values.",
    dimensions: ["Values", "Agreeableness"],
    questionId: 46,
    triple: {
      id: 24510,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "relationships", id: 24420 },
    },
  },
  {
    id: "value_ethics",
    text: "Ethics and fairness guide most of my decisions.",
    dimensions: ["Values", "Honesty-Humility"],
    questionId: 47,
    triple: {
      id: 24511,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am guided by", id: 24388 },
      object: { label: "ethics", id: 24389 },
    },
  },
  {
    id: "value_achievement",
    text: "Achievement and ambition strongly shape my life choices.",
    dimensions: ["Conscientiousness"],
    questionId: 48,
    triple: {
      id: 24512,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am shaped by", id: 24390 },
      object: { label: "ambition", id: 24391 },
    },
  },

  // --- Contextual Adaptability (4 items) ---
  {
    id: "adaptability_1",
    text: "My personality changes easily depending on the situation.",
    dimensions: ["Adaptability"],
    questionId: 49,
    triple: {
      id: 24513,
      subject: { label: "I", id: 24343 },
      predicate: { label: "adapt", id: 24392 },
      object: { label: "my personality", id: 24393 },
    },
  },
  {
    id: "adaptability_2",
    text: "I behave differently in different contexts to fit in.",
    dimensions: ["Adaptability"],
    questionId: 50,
    triple: {
      id: 24514,
      subject: { label: "I", id: 24343 },
      predicate: { label: "adapt", id: 24392 },
      object: { label: "my behavior", id: 24434 },
    },
  },
  {
    id: "adaptability_3",
    text: "I change how I think or act when situations require it.",
    dimensions: ["Adaptability"],
    questionId: 51,
    triple: {
      id: 24515,
      subject: { label: "I", id: 24343 },
      predicate: { label: "display", id: 24350 },
      object: { label: "adaptability", id: 24395 },
    },
  },
  {
    id: "adaptability_4",
    text: "I easily adjust to new environments.",
    dimensions: ["Adaptability"],
    questionId: 52,
    triple: {
      id: 24516,
      subject: { label: "I", id: 24343 },
      predicate: { label: "adjust to", id: 24396 },
      object: { label: "new environments", id: 24397 },
    },
  },

  // Additional Intrinsic Motivation items
  {
    id: "intrinsic_growth",
    text: "I pursue personal growth even when no one is watching.",
    dimensions: ["Intrinsic"],
    questionId: 53,
    triple: {
      id: 24517,
      subject: { label: "I", id: 24343 },
      predicate: { label: "pursue", id: 24398 },
      object: { label: "growth", id: 24399 },
    },
  },
  {
    id: "intrinsic_mastery",
    text: "Mastering a new skill is satisfying, even without recognition.",
    dimensions: ["Intrinsic"],
    questionId: 54,
    triple: {
      id: 24518,
      subject: { label: "I", id: 24343 },
      predicate: { label: "am satisfied", id: 24400 },
      object: { label: "mastering skills", id: 24401 },
    },
  },

  // Additional Extrinsic Motivation items
  {
    id: "extrinsic_reward",
    text: "I'm more likely to work hard when there's a reward.",
    dimensions: ["Extrinsic"],
    questionId: 55,
    triple: {
      id: 24519,
      subject: { label: "I", id: 24343 },
      predicate: { label: "work harder for", id: 24402 },
      object: { label: "reward", id: 24403 },
    },
  },
  {
    id: "extrinsic_validation",
    text: "I seek social validation for my achievements.",
    dimensions: ["Extrinsic"],
    questionId: 56,
    triple: {
      id: 24520,
      subject: { label: "I", id: 24343 },
      predicate: { label: "seek", id: 24376 },
      object: { label: "validation", id: 24404 },
    },
  },

  // Reverse-coded balance items
  {
    id: "intrinsic_reverse",
    text: "I find it hard to stay motivated unless others are watching.",
    dimensions: ["Intrinsic"],
    reverse: true,
    questionId: 57,
    triple: {
      id: 24521,
      subject: { label: "I", id: 24343 },
      predicate: { label: "stay motivated by", id: 24405 },
      object: { label: "observation", id: 24406 },
    },
  },
  {
    id: "extrinsic_reverse",
    text: "I care little for external praise.",
    dimensions: ["Extrinsic"],
    reverse: true,
    questionId: 58,
    triple: {
      id: 24522,
      subject: { label: "I", id: 24343 },
      predicate: { label: "value", id: 24346 },
      object: { label: "external praise", id: 24407 },
    },
  },
];
