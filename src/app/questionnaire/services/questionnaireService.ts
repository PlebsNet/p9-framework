// Service layer for handling API interactions related to the questionnaire
import { RephraseRequest, RephraseResponse, SaveFollowUpRequest } from "../types";

/**
 * Requests the API to rephrase a question when a user gives a neutral answer
 */
export async function rephraseQuestion(params: RephraseRequest): Promise<RephraseResponse> {
  const res = await fetch('/api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to rephrase question');
  }
  
  return res.json();
}

/**
 * Saves the user's answer to a follow-up question
 */
export async function saveFollowUpAnswer(params: SaveFollowUpRequest): Promise<void> {
  const res = await fetch('/api/agent', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to save follow-up answer');
  }
} 