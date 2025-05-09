# Questionnaire Module

This module implements a personality questionnaire with follow-up questions and scoring functionality.

## Directory Structure

```
questionnaire/
├── components/       # UI components
│   ├── Question.tsx  # Individual question component
│   ├── questions.ts  # Question data/content
│   └── QuestionnaireForm.tsx  # Main form component
├── context/          # State management
│   └── QuestionnaireContext.tsx  # Centralized state using Context API
├── services/         # Business logic and API interactions
│   ├── questionnaireService.ts   # API request handlers
│   └── storageService.ts         # Session/local storage management
└── types/            # Type definitions
    └── index.ts      # Shared type definitions
```

## Key Concepts

### State Management

The questionnaire uses React Context API for state management. The `QuestionnaireContext` handles:

- Answers tracking
- Question navigation
- Follow-up question generation
- Form submission
- Persistence to session storage

### Data Flow

1. User answers a question
2. If the answer is neutral (4 on 1-7 scale), a follow-up question is generated
3. Answers are saved to session storage in real-time
4. On completion, the user is redirected to results page
5. Results page calculates scores based on stored answers

### Services

- **questionnaireService**: Handles API interactions for question rephrasing
- **storageService**: Abstracts session storage operations

### Extending The Questionnaire

To add new questions:
1. Add the question to `questions.ts`
2. Update scoring logic in `lib/scoring.ts` if needed

## Related Modules

- **results/**: Displays calculated personality profile
- **lib/scoring.ts**: Contains scoring algorithms 