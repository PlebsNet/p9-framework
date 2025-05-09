import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { track } from "@vercel/analytics";
import { questions } from "../components/questions";
import { useRephrase } from "@/hooks/useRephrase";
import { saveFollowUpAnswer } from "../services/questionnaireService";
import * as storage from "../services/storageService";
import { QuestionnaireState } from "../types";

// Types
export interface Answer {
  value: number;
}

// Create context with default values
interface QuestionnaireContextType extends QuestionnaireState {
  // Computed values
  total: number;
  visible: any[];
  originalAnswersCount: number;
  allAnswered: boolean;
  
  // Methods
  handleAnswerChange: (id: string, value: number) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

// Context provider
export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const total = questions.length;

  // State
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<Record<string, string>>({});
  const [loadingFollowUp, setLoadingFollowUp] = useState<string | null>(null);
  const [rephraseIds, setRephraseIds] = useState<Record<string, string>>({});
  const [doubleNeutrals, setDoubleNeutrals] = useState<string[]>([]);

  const { mutateAsync: rephraseQuestion } = useRephrase();

  // Hydrate from session storage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Load answers
    const savedAnswers = storage.getAnswers();
    if (Object.keys(savedAnswers).length > 0) {
      setAnswers(savedAnswers);
    }
    
    // Load current index
    const idx = storage.getCurrentIndex(total);
    setCurrentIndex(idx);
  }, [total]);

  // Persist answers when they change
  useEffect(() => {
    storage.saveAnswers(answers);
  }, [answers]);

  // Persist current index when it changes
  useEffect(() => {
    storage.saveCurrentIndex(currentIndex);
  }, [currentIndex]);

  // Handle original question answers
  const handleOriginalAnswer = useCallback(
    async (id: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));

      // If NEUTRAL, trigger rephrase and DO NOT advance
      if (value === 4) {
        const questionText = questions.find((q) => q.id === id)?.text || "";
        setLoadingFollowUp(id);

        try {
          const { rephrasedPrompt, id: rephraseId } = await rephraseQuestion({
            questionId: id,
            questionText,
            answer: value,
          });
          setFollowUps((prev) => ({ ...prev, [id]: rephrasedPrompt }));
          setRephraseIds((prev) => ({ ...prev, [id]: rephraseId }));
        } catch (err) {
          console.error("Question rephrasing failed:", err);
        } finally {
          setLoadingFollowUp(null);
        }
        // DO NOT advance index for neutral responses
        return;
      }

      // For non-neutral answers, advance as normal
      const idx = questions.findIndex((q) => q.id === id);
      if (idx === currentIndex && currentIndex < total - 1) {
        setCurrentIndex(idx + 1);
      }
    },
    [currentIndex, rephraseQuestion, total]
  );

  // Handle follow-up question answers
  const handleFollowUpAnswer = useCallback(
    async (id: string, value: number) => {
      const originalId = id.replace("_followup", "");
      const rephraseId = rephraseIds[originalId];
      setAnswers((prev) => ({ ...prev, [id]: value }));

      // Track double-neutral responses
      const isDoubleNeutral = value === 4;
      if (isDoubleNeutral) {
        // Update state
        setDoubleNeutrals((prev) => [...prev, originalId]);
        
        // Also store in sessionStorage for blockchain integration
        const currentDoubleNeutrals = JSON.parse(sessionStorage.getItem('p9_double_neutrals') || '[]');
        if (!currentDoubleNeutrals.includes(originalId)) {
          sessionStorage.setItem(
            'p9_double_neutrals', 
            JSON.stringify([...currentDoubleNeutrals, originalId])
          );
        }
        
        console.log(`Detected double-neutral response for question ${originalId}`);
      }
      
      // Save follow-up answer to DB
      if (rephraseId) {
        try {
          await saveFollowUpAnswer({ 
            id: rephraseId, 
            followUpAnswer: String(value),
            isDoubleNeutral 
          });
        } catch (err) {
          console.error("Failed to save follow-up answer:", err);
        }
      }

      // Always advance after a follow-up is answered
      const idx = questions.findIndex((q) => q.id === originalId);
      if (idx === currentIndex && currentIndex < total - 1) {
        setCurrentIndex(idx + 1);
      }
    },
    [currentIndex, rephraseIds, total]
  );

  // Main answer change handler
  const handleAnswerChange = useCallback(
    (id: string, value: number) => {
      if (id.endsWith("_followup")) {
        handleFollowUpAnswer(id, value);
      } else {
        handleOriginalAnswer(id, value);
      }
    },
    [handleFollowUpAnswer, handleOriginalAnswer]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Count only answers to original questions (not follow-ups) for completion check
      const originalQuestionsAnswered = Object.keys(answers).filter(id => !id.includes('_followup')).length;
      
      if (originalQuestionsAnswered !== total) {
        setFormError(`Please answer all questions before submitting. (${originalQuestionsAnswered}/${total})`);
        return;
      }
      
      setFormError(null);
      setIsSubmitting(true);

      try {
        // generate or reuse testId
        const testId = storage.getOrCreateTestId(nanoid);

        // analytics (fire-and-forget)
        try { track("Completed Questionnaire"); } catch { }

        // Navigate to results (answers/testId still in sessionStorage)
        router.push("/results");
      } finally {
        setIsSubmitting(false);
      }
    },
    [answers, router, total]
  );

  // Computed values
  const visible = questions.slice(0, currentIndex + 1);
  const originalAnswersCount = Object.keys(answers).filter(id => !id.includes('_followup')).length;
  const allAnswered = originalAnswersCount === total;

  const value = {
    // State
    answers,
    currentIndex,
    isSubmitting,
    formError,
    followUps,
    loadingFollowUp,
    doubleNeutrals,
    rephraseIds,
    
    // Computed values
    total,
    visible,
    originalAnswersCount,
    allAnswered,
    
    // Methods
    handleAnswerChange,
    handleSubmit,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

// Custom hook for using the context
export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
  }
  return context;
} 