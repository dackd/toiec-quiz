export interface Question {
  question: string;
  questionNumber: number;
  answers: string[];
  correctAnswer: string;
  answerInfo: string[];
  answerSelection: string[];
  vocabulary: string[];
}

export interface Quiz {
  category: string;
  questions: Question[];
}

export interface UserAnswer {
  questionNumber: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizSession {
  testNumber: number;
  quiz: Quiz;
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  score: number;
}
