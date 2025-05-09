import { Dimension } from "@/lib/archetypeCentroids";

export interface Question {
  id: string;
  text: string;
  dimensions: Dimension[]; // replaces 'dimension'
  reverse?: boolean;
  weight?: number;
}

export const questions: Question[] = [
  // --- HEXACO Traits (4 items each) ---
  // Honesty–Humility
  { id: "hh_1", text: "I rarely manipulate others to achieve my goals.", dimensions: ["Honesty-Humility"] },
  { id: "hh_2", text: "I strongly value honesty, even if it's costly.", dimensions: ["Honesty-Humility"] },
  { id: "hh_3", text: "I'm uncomfortable pretending to be something I'm not.", dimensions: ["Honesty-Humility"] },
  { id: "hh_4", text: "I am modest about my achievements.", dimensions: ["Honesty-Humility"] },

  // Emotionality
  { id: "emotionality_1", text: "I easily sense other people's emotions.", dimensions: ["Emotionality"] },
  { id: "emotionality_2", text: "I frequently feel anxious or worried.", dimensions: ["Emotionality"] },
  { id: "emotionality_3", text: "I deeply empathize with others' struggles.", dimensions: ["Emotionality"] },
  { id: "emotionality_4", text: "I become emotional easily.", dimensions: ["Emotionality"] },

  // Extraversion
  { id: "extraversion_1", text: "I feel energized by social activities.", dimensions: ["Extraversion"] },
  { id: "extraversion_2", text: "I prefer being around people rather than alone.", dimensions: ["Extraversion"] },
  { id: "extraversion_3", text: "I'm outgoing and sociable.", dimensions: ["Extraversion"] },
  { id: "extraversion_4", text: "Social interactions make me feel good.", dimensions: ["Extraversion"] },

  // Agreeableness
  { id: "agreeableness_1", text: "I usually forgive others quickly.", dimensions: ["Agreeableness"] },
  { id: "agreeableness_2", text: "I find it easy to cooperate with others.", dimensions: ["Agreeableness"] },
  { id: "agreeableness_3", text: "I avoid conflicts when possible.", dimensions: ["Agreeableness"] },
  { id: "agreeableness_4", text: "I'm patient and understanding.", dimensions: ["Agreeableness"] },

  // Conscientiousness
  { id: "conscientiousness_1", text: "I'm highly organized in daily life.", dimensions: ["Conscientiousness"] },
  { id: "conscientiousness_2", text: "I plan my tasks carefully before starting.", dimensions: ["Conscientiousness"] },
  { id: "conscientiousness_3", text: "I'm disciplined in achieving my goals.", dimensions: ["Conscientiousness"] },
  { id: "conscientiousness_4", text: "I consistently complete tasks I start.", dimensions: ["Conscientiousness"] },

  // Openness
  { id: "openness_1", text: "I'm fascinated by new ideas and innovations.", dimensions: ["Openness"] },
  { id: "openness_2", text: "I actively seek out creative experiences.", dimensions: ["Openness"] },
  { id: "openness_3", text: "I often think about abstract concepts.", dimensions: ["Openness"] },
  { id: "openness_4", text: "I enjoy exploring unfamiliar places or topics.", dimensions: ["Openness"] },

  // --- Cognitive Styles (4 items each) ---
  // Analytical Thinking
  { id: "analytical_1", text: "I trust my intuition more than detailed analysis.", dimensions: ["Analytical"], reverse: true },
  { id: "analytical_2", text: "I carefully analyze situations before deciding.", dimensions: ["Analytical"] },
  { id: "analytical_3", text: "I rely on logic more than gut feelings.", dimensions: ["Analytical"] },
  { id: "analytical_4", text: "Creative ideas often guide my decisions.", dimensions: ["Analytical"], reverse: true },

  // Pragmatic vs Idealistic
  { id: "pragmatic_1", text: "I value practical outcomes over ideals.", dimensions: ["Pragmatic"] },
  { id: "pragmatic_2", text: "My decisions are grounded in reality, not dreams.", dimensions: ["Pragmatic"] },
  { id: "pragmatic_3", text: "I prefer realism over idealism in most situations.", dimensions: ["Pragmatic"] },
  { id: "pragmatic_4", text: "My values guide my actions more than practical results.", dimensions: ["Pragmatic"], reverse: true },

  // Strategic vs Tactical
  { id: "strategic_1", text: "I think strategically and long-term.", dimensions: ["Strategic"] },
  { id: "strategic_2", text: "I'm good at immediate problem-solving.", dimensions: ["Strategic"], reverse: true },
  { id: "strategic_3", text: "I often plan years ahead.", dimensions: ["Strategic"] },
  { id: "strategic_4", text: "I prefer quick and adaptable solutions.", dimensions: ["Strategic"], reverse: true },

  // --- Motivational Drivers (by category) ---
  // Intrinsic Motivation
  { id: "intrinsic_autonomy", text: "I strongly value my independence and freedom.", dimensions: ["Intrinsic"] },
  { id: "intrinsic_competence", text: "Feeling competent and skilled matters greatly to me.", dimensions: ["Intrinsic"] },
  { id: "intrinsic_relatedness", text: "Having meaningful relationships motivates me.", dimensions: ["Intrinsic"] },

  // Extrinsic Motivation
  { id: "extrinsic_recognition", text: "Recognition from others significantly motivates me.", dimensions: ["Extrinsic"] },
  { id: "extrinsic_status", text: "Achieving status and success drives many of my decisions.", dimensions: ["Extrinsic"] },
  { id: "extrinsic_security", text: "I highly value financial security.", dimensions: ["Extrinsic"] },

  // Personal Values
  { id: "value_creativity", text: "Creativity and innovation are core parts of who I am.", dimensions: ["Values", "Openness"] },
  { id: "value_stability", text: "A stable, predictable life is essential to my happiness.", dimensions: ["Values"] },
  { id: "value_adventure", text: "I actively seek adventure and excitement.", dimensions: ["Values", "Openness"] },
  { id: "value_community", text: "Community and relationships are central to my values.", dimensions: ["Values", "Agreeableness"] },
  { id: "value_ethics", text: "Ethics and fairness guide most of my decisions.", dimensions: ["Values", "Honesty-Humility"] },
  { id: "value_achievement", text: "Achievement and ambition strongly shape my life choices.", dimensions: ["Conscientiousness"] },

  // --- Contextual Adaptability (4 items) ---
  { id: "adaptability_1", text: "My personality changes easily depending on the situation.", dimensions: ["Adaptability"] },
  { id: "adaptability_2", text: "I behave differently in different contexts to fit in.", dimensions: ["Adaptability"] },
  { id: "adaptability_3", text: "I change how I think or act when situations require it.", dimensions: ["Adaptability"] },
  { id: "adaptability_4", text: "I easily adjust to new environments.", dimensions: ["Adaptability"] },
  // Additional Intrinsic Motivation items
  { id: "intrinsic_growth", text: "I pursue personal growth even when no one is watching.", dimensions: ["Intrinsic"] },
  { id: "intrinsic_mastery", text: "Mastering a new skill is satisfying, even without recognition.", dimensions: ["Intrinsic"] },

  // Additional Extrinsic Motivation items
  { id: "extrinsic_reward", text: "I’m more likely to work hard when there’s a reward.", dimensions: ["Extrinsic"] },
  { id: "extrinsic_validation", text: "I seek social validation for my achievements.", dimensions: ["Extrinsic"] },

  // Reverse-coded balance items
  { id: "intrinsic_reverse", text: "I find it hard to stay motivated unless others are watching.", dimensions: ["Intrinsic"], reverse: true },
  { id: "extrinsic_reverse", text: "I care little for external praise.", dimensions: ["Extrinsic"], reverse: true }
];
