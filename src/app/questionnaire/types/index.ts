import { Dimension } from "@/lib/archetypeCentroids";

// Question model definition
export interface Question {
  id: string;
  text: string;
  dimension: Dimension | "Analytical" | "Pragmatic" | "Strategic" | "Intrinsic" | "Extrinsic" | "Values";
  reverse?: boolean;
}

// Props for the Question component
export interface QuestionProps {
  id: string;
  text: string;
  value: number; // 0 = no answer yet
  onChange: (id: string, value: number) => void;
  disabled?: boolean;
  outlined?: boolean;
}

// Application state related to questionnaire
export interface QuestionnaireState {
  answers: Record<string, number>;
  currentIndex: number;
  followUps: Record<string, string>;
  rephraseIds: Record<string, string>;
  doubleNeutrals: string[];
  isSubmitting: boolean;
  formError: string | null;
  loadingFollowUp: string | null;
}

// API request/response types
export interface RephraseRequest {
  userId?: string;
  sessionId?: string;
  questionId: string;
  questionText: string;
  answer: number;
}

export interface RephraseResponse {
  rephrasedPrompt: string;
  id: string;
}

export interface SaveFollowUpRequest {
  id: string;
  followUpAnswer: string;
  isDoubleNeutral: boolean;
} 