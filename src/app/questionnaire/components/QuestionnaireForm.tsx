"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestionnaire } from "../context/QuestionnaireContext";
import Question from "./Question";
import { ClearData } from "@/components/ClearData";

// Animation constants
const ANIM = { duration: 0.3 };

export default function QuestionnaireForm() {
  const {
    handleSubmit,
    formError,
    visible,
    currentIndex,
    followUps,
    loadingFollowUp,
    answers,
    handleAnswerChange,
    isSubmitting,
    total,
    allAnswered,
  } = useQuestionnaire();

  return (
    <>
      {/* Add the Clear Data button at the top, outside the form */}
      <div className="bg-gray-100 p-4 mb-6 rounded-lg max-w-2xl mx-auto flex justify-center">
        <ClearData />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Personality Assessment</h2>

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600" aria-live="polite">
            Question {currentIndex + 1} of {total}
          </p>
          <button
            type="submit"
            disabled={!allAnswered || isSubmitting}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-600 transition-opacity"
          >
            {isSubmitting ? "Submitting..." : "Submit Answers"}
          </button>
        </div>

        {formError && (
          <p className="mb-4 text-red-600" role="alert">
            {formError}
          </p>
        )}

        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((q, revIdx) => {
              const idx = visible.length - 1 - revIdx;
              const isActive = idx === currentIndex;
              const isFollowUpLoading = loadingFollowUp === q.id;
              const followUp = followUps[q.id];

              return (
                <motion.div
                  key={q.id}
                  initial={{ y: isActive ? -10 : 0, opacity: isActive ? 1 : 0.6 }}
                  animate={{ y: 0, opacity: isActive ? 1 : 0.5 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={ANIM}
                  className={isActive ? "mb-8" : "mb-4"}
                >
                  {/* Show loading or follow-up ABOVE the original question */}
                  {isActive && (
                    <>
                      {isFollowUpLoading && (
                        <p className="text-sm text-gray-500 animate-pulse pl-4 mb-2">🧠 Generating follow-up...</p>
                      )}
                      {followUp && (
                        <Question
                          id={`${q.id}_followup`}
                          text={followUp}
                          value={answers[`${q.id}_followup`] ?? 0}
                          onChange={handleAnswerChange}
                        />
                      )}
                    </>
                  )}

                  {/* Original Question (outlined/disabled if follow-up exists) */}
                  <Question
                    id={q.id}
                    text={q.text}
                    value={answers[q.id] ?? 0}
                    onChange={handleAnswerChange}
                    disabled={!!followUp}
                    outlined={!!followUp}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </form>
    </>
  );
} 