"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export interface QuestionProps {
  id: string;
  text: string;
  value: number; // 0 = no answer yet
  onChange: (id: string, value: number) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  isAnswered?: boolean;
  explorerButton?: React.ReactNode;
}

const ticks = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Slightly Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" },
];

export default function Question({
  id,
  text,
  value,
  onChange,
  isLoading = false,
  isSuccess = false,
  isAnswered = false,
  explorerButton,
}: QuestionProps) {
  // Treat 0 as "no selection"
  const selected = value > 0 ? String(value) : undefined;

  return (
    <div className="mb-8">
      <fieldset>
        <legend id={`${id}-legend`} className="block mb-2 font-medium">
          <div className="flex items-center gap-2">
            {text}
            {explorerButton}
          </div>
        </legend>

        <RadioGroup
          name={id}
          value={selected}
          onValueChange={(val) => onChange(id, Number(val))}
          className="grid grid-cols-7 gap-2"
          required
          aria-labelledby={`${id}-legend`}
        >
          {ticks.map((t) => (
            <label
              key={t.value}
              htmlFor={`${id}-${t.value}`}
              className="flex flex-col items-center cursor-pointer"
            >
              {isSuccess && value === t.value ? (
                <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-green-500" />
              ) : isLoading && value === t.value ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <RadioGroupItem
                  id={`${id}-${t.value}`}
                  value={String(t.value)}
                  disabled={isLoading}
                />
              )}
              <span className="mt-1 text-[9px] text-gray-500 text-center">
                {t.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
