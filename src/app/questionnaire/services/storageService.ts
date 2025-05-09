// Constants
export const STORAGE_KEYS = {
  ANSWERS: "p9_answers",
  INDEX: "p9_currentIndex",
  TEST_ID: "p9_testId",
};

/**
 * Saves data to session storage
 */
export function saveToSessionStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to sessionStorage (${key}):`, error);
  }
}

/**
 * Retrieves data from session storage
 */
export function getFromSessionStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from sessionStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Stores the test answers in session storage
 */
export function saveAnswers(answers: Record<string, number>): void {
  saveToSessionStorage(STORAGE_KEYS.ANSWERS, answers);
}

/**
 * Retrieves stored test answers
 */
export function getAnswers(): Record<string, number> {
  return getFromSessionStorage<Record<string, number>>(STORAGE_KEYS.ANSWERS, {});
}

/**
 * Stores the current question index
 */
export function saveCurrentIndex(index: number): void {
  saveToSessionStorage(STORAGE_KEYS.INDEX, index);
}

/**
 * Retrieves the current question index
 */
export function getCurrentIndex(total: number): number {
  const index = getFromSessionStorage<number>(STORAGE_KEYS.INDEX, 0);
  return index >= 0 && index < total ? index : 0;
}

/**
 * Stores or retrieves the test ID
 */
export function getOrCreateTestId(createFn: () => string): string {
  const stored = getFromSessionStorage<string>(STORAGE_KEYS.TEST_ID, "");
  if (stored) return stored;
  
  const newId = createFn();
  saveToSessionStorage(STORAGE_KEYS.TEST_ID, newId);
  return newId;
} 