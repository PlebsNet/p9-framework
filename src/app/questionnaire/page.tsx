"use client";

import React from "react";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";
import QuestionnaireForm from "./components/QuestionnaireForm";

export default function QuestionnairePage() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireForm />
    </QuestionnaireProvider>
  );
}
