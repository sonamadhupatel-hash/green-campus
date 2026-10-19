import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { QuizQuestion } from '../types';
import { 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { recordQuizAttempt, quizAttempts, ecoPoints, openModal } = useApp();

  // Quiz Engine State
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [quizLength, setQuizLength] = useState<number>(10);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Active questions shuffled for this attempt
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  // User answers map: questionId -> selectedIndex
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  // Track if user clicked show feedback for the current question
  const [revealedQuestions, setRevealedQuestions] = useState<{ [qId: string]: boolean }>({});

  const topics = [
    'All Topics',
    'Recycling & Waste',
    'Renewable Energy',
    'Water Conservation',
    'Climate Change',
    'Biodiversity',
    'Campus Practices'
  ];

  // Start new quiz attempt
  const startQuiz = () => {
    let pool = [...QUIZ_QUESTIONS];
    if (selectedTopic !== 'All Topics') {
      pool = pool.filter((q) => q.topic === selectedTopic);
    }
    // Randomize order
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(quizLength, shuffled.length));

    setActiveQuestions(selected);
    setSelectedAnswers({});
    setRevealedQuestions({});
    setCurrentIndex(0);
    setIsQuizActive(true);
    setIsQuizFinished(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    // If already answered, allow changing until revealed, or allow immediate feedback
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Finish quiz & calculate score
  const finishQuiz = () => {
    let score = 0;
    const userAnswers = activeQuestions.map((q) => {
      const selectedIndex = selectedAnswers[q.id] ?? -1;
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        selectedIndex,
        isCorrect
      };
    });

    recordQuizAttempt(selectedTopic, score, activeQuestions.length, userAnswers);
    setIsQuizFinished(true);
    setIsQuizActive(false);
  };

  // Compute best score
  const bestAttempt = useMemo(() => {
    if (quizAttempts.length === 0) return null;
    return [...quizAttempts].sort((a, b) => b.percentage - a.percentage)[0];
  }, [quizAttempts]);

  const currentQ = activeQuestions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Environmental Learning Engine</span>
        </div>
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
          Campus Eco Awareness Quiz
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Test your environmental literacy on campus waste sorting, rooftop solar physics, rainwater harvesting, and biodiversity conservation. Complete quizzes to unlock Eco Points!
        </p>
      </div>

      {/* ================= STATE 1: QUIZ CONFIGURATION / START SCREEN ================= */}
      {!isQuizActive && !isQuizFinished && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          {/* Historical Stats Summary */}
          {quizAttempts.length > 0 && (
            <div className="p-4 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">
                    {quizAttempts.length} Quiz Attempt{quizAttempts.length > 1 ? 's' : ''} Completed
                  </div>
                  <div className="text-emerald-800">
                    Your Best Score: <strong>{bestAttempt?.score}/{bestAttempt?.total} ({bestAttempt?.percentage}%)</strong>
                  </div>
                </div>
              </div>
              <div className="font-mono text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                Eco Points: {ecoPoints} pts
              </div>
            </div>
          )}

          {/* Topic Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
              Select Knowledge Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                    selectedTopic === t
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
              Quiz Length
            </label>
            <div className="flex items-center gap-3">
              {[5, 10, 12].map((len) => (
                <button
                  key={len}
                  onClick={() => setQuizLength(len)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    quizLength === len
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {len} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Scoring Rules Card */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
            <div className="font-bold text-neutral-800 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Scoring & Gamification Rules
            </div>
            <p>
              • <strong>+2 Eco Points</strong> for every correct answer.
            </p>
            <p>
              • <strong>+10 Bonus Points</strong> for scoring 80% or higher.
            </p>
            <p>
              • 100% offline: questions run directly in your browser without requiring external APIs.
            </p>
          </div>

          {/* Start CTA */}
          <button
            onClick={startQuiz}
            className="w-full py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Begin Eco Quiz ({selectedTopic})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ================= STATE 2: ACTIVE QUESTION SCREEN ================= */}
      {isQuizActive && currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm space-y-6 animate-in fade-in duration-200">
          
          {/* Top Progress & Topic Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {currentQ.topic}
              </span>
              <span className="font-mono font-medium">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Multiple Choice Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const isRevealed = revealedQuestions[currentQ.id];
              const isCorrect = optIdx === currentQ.correctIndex;

              let btnStyle = 'border-neutral-200 bg-neutral-50/70 hover:bg-neutral-100 text-neutral-800';
              if (isRevealed) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-950';
                } else {
                  btnStyle = 'border-neutral-200 bg-neutral-50/40 text-neutral-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {isRevealed && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isRevealed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Educational Explanation on Reveal */}
          {revealedQuestions[currentQ.id] && (
            <div className="p-4 bg-emerald-50/80 border border-emerald-100 rounded-xl text-xs space-y-1.5 animate-in fade-in duration-200">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Environmental Science Explanation</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls: Prev, Next, Finish */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                currentIndex === 0
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-neutral-500 font-mono">
              Answered: {answeredCount}/{activeQuestions.length}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedAnswers[currentQ.id] !== undefined
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === activeQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ================= STATE 3: RESULTS & SCORECARD ================= */}
      {isQuizFinished && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          {(() => {
            const lastAttempt = quizAttempts[0];
            const score = lastAttempt ? lastAttempt.score : 0;
            const total = lastAttempt ? lastAttempt.total : activeQuestions.length;
            const pct = lastAttempt ? lastAttempt.percentage : 0;
            const isHigh = pct >= 80;

            return (
              <>
                <div className="text-center space-y-3 pb-6 border-b border-neutral-100">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mx-auto">
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-neutral-900">
                    {isHigh ? 'Outstanding Environmental Literacy!' : 'Quiz Complete! Good Effort!'}
                  </h2>
                  <p className="text-neutral-600 text-xs max-w-md mx-auto">
                    You answered {score} out of {total} questions correctly ({pct}%). Eco Points have been credited to your active session.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200 font-mono text-emerald-900 font-bold text-sm">
                    <span>Score: {score} / {total}</span>
                    <span aria-hidden="true" className="text-emerald-300">·</span>
                    <span>{pct}%</span>
                  </div>
                </div>

                {/* Review All Answers Summary */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                    Question-by-Question Review
                  </h3>
                  
                  <div className="space-y-4">
                    {activeQuestions.map((q, idx) => {
                      const userAnsIdx = selectedAnswers[q.id];
                      const isCorrect = userAnsIdx === q.correctIndex;

                      return (
                        <div 
                          key={q.id}
                          className={`p-4 rounded-xl border text-xs space-y-2 ${
                            isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/40 border-red-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-neutral-900">
                              {idx + 1}. {q.question}
                            </span>
                            {isCorrect ? (
                              <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                                <CheckCircle2 className="w-4 h-4" /> Correct
                              </span>
                            ) : (
                              <span className="text-red-700 font-bold flex items-center gap-1 shrink-0">
                                <XCircle className="w-4 h-4" /> Incorrect
                              </span>
                            )}
                          </div>

                          <div className="text-neutral-600 space-y-1">
                            <div>Your Answer: <em>{userAnsIdx !== undefined ? q.options[userAnsIdx] : 'None'}</em></div>
                            {!isCorrect && (
                              <div className="font-semibold text-emerald-800">
                                Correct Answer: {q.options[q.correctIndex]}
                              </div>
                            )}
                          </div>

                          <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-100/80">
                            <strong>Note:</strong> {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions: Restart or Explore Initiatives */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100">
                  <button
                    onClick={startQuiz}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Another Quiz Attempt</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsQuizFinished(false);
                      setIsQuizActive(false);
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Change Topic or Length
                  </button>
                </div>
              </>
            );
          })()}

        </div>
      )}

    </div>
  );
};
