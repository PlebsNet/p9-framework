"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { QuestionProps } from "../types";

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
  disabled,
  outlined,
}: QuestionProps) {
  // Always provide a string value to RadioGroup, even if it's empty string
  // This ensures the component stays in controlled mode consistently
  const selected = value > 0 ? String(value) : "";

  return (
    <div className={`p-4 rounded border ${outlined ? 'border-gray-400 bg-gray-100 opacity-60' : 'border-transparent'}`}>
      <fieldset>
        <legend id={`${id}-legend`} className="block mb-2 font-medium">
          {text}
        </legend>

        <RadioGroup
          name={id}
          value={selected}
          onValueChange={(val) => onChange(id, Number(val))}
          className="grid grid-cols-7 gap-2"
          required
          aria-labelledby={`${id}-legend`}
          disabled={disabled}
        >
          {ticks.map((t) => (
            <label
              key={t.value}
              htmlFor={`${id}-${t.value}`}
              className="flex flex-col items-center cursor-pointer"
            >
              <RadioGroupItem
                id={`${id}-${t.value}`}
                value={String(t.value)}
              />
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
