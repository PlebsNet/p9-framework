import { useState, useEffect } from 'react';

// Hook for managing session storage
export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Get from session storage on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);
      return initialValue;
    }
  });
  
  // Update session storage when the state changes
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to sessionStorage:", error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
} 