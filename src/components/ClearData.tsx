"use client";

import { useState } from "react";

export function ClearData() {
  const [cleared, setCleared] = useState(false);

  const clearAllData = () => {
    try {
      // Clear session storage
      sessionStorage.clear();
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear any specific keys we know about
      const keysToRemove = [
        'p9_answers',
        'p9_currentIndex',
        'p9_testId',
        'p9_blockchain_answers',
        'p9_double_neutrals'
      ];
      
      keysToRemove.forEach(key => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      });
      
      setCleared(true);
      
      // Reload the page after 1 second to ensure clean state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <button
      onClick={clearAllData}
      className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded hover:bg-red-700 transition shadow-md"
    >
      {cleared ? "✓ Data Cleared! Reloading..." : "🗑️ Reset All Data"}
    </button>
  );
} 