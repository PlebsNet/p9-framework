import { useMutation } from '@tanstack/react-query';
import { rephraseQuestion } from '@/app/questionnaire/services/questionnaireService';

// Hook for rephrasing questions
export function useRephrase() {
  return useMutation({
    mutationFn: rephraseQuestion,
  });
}
