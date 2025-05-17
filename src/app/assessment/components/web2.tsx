"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { track } from "@vercel/analytics";
import Question from "./Question";
import { questions } from "./questions";
import DynamicGraph from "@/components/ForceGraph3D";
import { useContainerSize } from '@/hooks/useContainerSize';

const ANIM = { duration: 0.3 };
const STORAGE_ANS = "plebs_answers";
const STORAGE_IDX = "plebs_currentIndex";
const STORAGE_TEST = "plebs_testId";

export default function Web2Assessment() {
    const router = useRouter();
    const total = questions.length;
    const { containerRef, dimensions } = useContainerSize();

    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Hydrate once on mount (fire-and-forget)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const a = sessionStorage.getItem(STORAGE_ANS);
            if (a) setAnswers(JSON.parse(a));
            const idx = parseInt(sessionStorage.getItem(STORAGE_IDX) || "", 10);
            if (!isNaN(idx) && idx >= 0 && idx < total) {
                setCurrentIndex(idx);
            }
        } catch { }
    }, [total]);

    // Persist answers & index continuously
    useEffect(() => {
        if (typeof window === "undefined") return;
        sessionStorage.setItem(STORAGE_ANS, JSON.stringify(answers));
    }, [answers]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        sessionStorage.setItem(STORAGE_IDX, String(currentIndex));
    }, [currentIndex]);

    // advances index when the user answers current question
    const handleAnswerChange = useCallback(
        (id: string, value: number) => {
            setAnswers((prev) => ({ ...prev, [id]: value }));
            const idx = questions.findIndex((q) => q.id === id);
            if (idx === currentIndex && currentIndex < total - 1) {
                setCurrentIndex(idx + 1);
            }
        },
        [currentIndex, total]
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (Object.keys(answers).length !== total) {
                setFormError("Please answer all questions before submitting.");
                return;
            }
            setFormError(null);
            setIsSubmitting(true);

            try {
                // generate or reuse testId
                let testId = sessionStorage.getItem(STORAGE_TEST);
                if (!testId) {
                    testId = nanoid();
                    sessionStorage.setItem(STORAGE_TEST, testId);
                }

                // analytics (fire-and-forget)
                try { track("Completed Assessment"); } catch { }

                // Navigate to results (answers/testId still in sessionStorage)
                router.push("/results");
            } finally {
                setIsSubmitting(false);
            }
        },
        [answers, router, total]
    );

    const visible = questions.slice(0, currentIndex + 1);
    const allAnswered = Object.keys(answers).length === total;

    return (
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
                        return (
                            <motion.div
                                key={q.id}
                                initial={{ y: isActive ? -10 : 0, opacity: isActive ? 1 : 0.6 }}
                                animate={{ y: 0, opacity: isActive ? 1 : 0.5 }}
                                exit={{ y: 10, opacity: 0 }}
                                transition={ANIM}
                                className={isActive ? "mb-8" : "mb-4"}
                            >
                                <Question
                                    id={q.id}
                                    text={q.text}
                                    value={answers[q.id] ?? 0}
                                    onChange={handleAnswerChange}
                                />
                            </motion.div>
                        );
                    })}
            </AnimatePresence>
        </form>
    );
} 