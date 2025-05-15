"use client";

import React, { useState, useRef, useEffect } from "react";

interface LabelFeedbackProps {
  label: string;
}

const LabelFeedback: React.FC<LabelFeedbackProps> = ({ label }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const confirmationRef = useRef<HTMLParagraphElement>(null);

  const sendFeedback = async (rating: 1 | 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, rating }),
      });
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      console.error("Feedback submission error:", message);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Move focus to the confirmation message for screen readers
  useEffect(() => {
    if (submitted && confirmationRef.current) {
      confirmationRef.current.focus();
    }
  }, [submitted]);

  if (submitted) {
    return (
      <p
        ref={confirmationRef}
        tabIndex={-1}
        aria-live="polite"
        className="mt-4 text-green-600 font-medium"
      >
        Thanks for your feedback!
      </p>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <p className="mb-2 font-medium">Was this label clear?</p>
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <div className="flex space-x-4">
        <button
          onClick={() => sendFeedback(1)}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          aria-busy={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          👍 Yes
        </button>
        <button
          onClick={() => sendFeedback(0)}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          aria-busy={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          👎 No
        </button>
      </div>
    </div>
  );
};

export default LabelFeedback;
