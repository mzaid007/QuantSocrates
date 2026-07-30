import React, { useState, useEffect } from 'react';
import MathRenderer from './MathRenderer';
import TopicSelector from './TopicSelector';
import { QUESTION_BANK } from '../lib/questionBank';
import { getDifficultyLabel, evaluateAdaptiveStep } from '../lib/adaptiveEngine';
import { syncProgressWithAPI } from '../lib/storage';
import {
  Brain,
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Edit3,
  Lightbulb,
  ShieldAlert,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  X
} from 'lucide-react';

export default function PracticeDashboard({
  activeTopicId,
  setActiveTopicId,
  skillMatrix,
  setSkillMatrix,
  onRecordError
}) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [scratchpadText, setScratchpadText] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null); // { isCorrect, hint, conceptualTrap, latexExplanation }
  const [chatHistory, setChatHistory] = useState([]);
  const [isLevelChangedNotification, setIsLevelChangedNotification] = useState(null);
  const [showMobileHintSheet, setShowMobileHintSheet] = useState(false);

  const topicState = skillMatrix[activeTopicId] || { level: 1 };
  const currentTopicQuestions = QUESTION_BANK[activeTopicId] || QUESTION_BANK.arithmetic;

  // Pick question based on current topic adaptive level
  useEffect(() => {
    const targetLevel = topicState.level || 1;
    const question = currentTopicQuestions.find((q) => q.level === targetLevel) || currentTopicQuestions[0];
    setCurrentQuestion(question);
    setSelectedOption('');
    setCustomInput('');
    setScratchpadText('');
    setFeedback(null);
    setAttemptCount(0);
    setChatHistory([]);
    setShowMobileHintSheet(false);
  }, [activeTopicId, topicState.level]);

  if (!currentQuestion) return null;

  const activeAnswer = selectedOption || customInput.trim();

  // Handle Answer Submission & Socratic Feedback
  const handleSubmitAnswer = async (overrideAnswer = null) => {
    const answerToTest = overrideAnswer || activeAnswer;
    if (!answerToTest || isEvaluating) return;

    setIsEvaluating(true);
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);

    const isExactMatch = String(answerToTest).trim().toLowerCase() === String(currentQuestion.correctAnswer).trim().toLowerCase();

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQuestion.questionText,
          studentAnswer: answerToTest,
          correctAnswer: currentQuestion.correctAnswer,
          topic: activeTopicId,
          difficultyLevel: currentQuestion.level,
          isFirstAttempt: nextAttempt === 1
        })
      });

      let resData;
      if (response.ok) {
        resData = await response.json();
      } else {
        throw new Error('API server unavailable');
      }

      setFeedback(resData);
      setShowMobileHintSheet(true); // Open mobile hint bottom drawer automatically on answer submit!

      const newChatMessage = {
        studentAnswer: answerToTest,
        isCorrect: resData.isCorrect,
        hint: resData.hint,
        conceptualTrap: resData.conceptualTrap,
        explanation: resData.latexExplanation
      };
      setChatHistory((prev) => [...prev, newChatMessage]);

      if (resData.isCorrect || nextAttempt >= 2) {
        processAdaptiveStep(resData.isCorrect, answerToTest, resData);
      } else {
        onRecordError({
          topicKey: activeTopicId,
          topicName: activeTopicId,
          questionText: currentQuestion.questionText,
          studentAnswer: answerToTest,
          correctAnswer: currentQuestion.correctAnswer,
          conceptualTrap: resData.conceptualTrap,
          socraticHint: resData.hint
        });
      }
    } catch (e) {
      console.warn('API error, falling back to local Socratic evaluation:', e);
      const fallbackFeedback = {
        isCorrect: isExactMatch,
        hint: isExactMatch
          ? "Excellent solution! You correctly identified the target relationship."
          : `Hint: Examine the expression for ${activeTopicId}. Did you check for operational trap: "${currentQuestion.trap}"?`,
        conceptualTrap: isExactMatch ? "None" : currentQuestion.trap,
        latexExplanation: currentQuestion.explanation
      };
      setFeedback(fallbackFeedback);
      setShowMobileHintSheet(true);
      setChatHistory((prev) => [...prev, {
        studentAnswer: answerToTest,
        isCorrect: isExactMatch,
        hint: fallbackFeedback.hint,
        conceptualTrap: fallbackFeedback.conceptualTrap,
        explanation: fallbackFeedback.latexExplanation
      }]);

      if (isExactMatch || nextAttempt >= 2) {
        processAdaptiveStep(isExactMatch, answerToTest, fallbackFeedback);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Adaptive Step Update Logic
  const processAdaptiveStep = async (isCorrect, finalAnswer, feedbackObj) => {
    const result = evaluateAdaptiveStep(skillMatrix, activeTopicId, isCorrect);
    setSkillMatrix(result.updatedMatrix);

    if (result.leveledUp) {
      setIsLevelChangedNotification(`Level Up! You reached ${getDifficultyLabel(result.newLevel)} in ${activeTopicId}.`);
    } else if (result.leveledDown) {
      setIsLevelChangedNotification(`Difficulty lowered to Level ${result.newLevel} to solidify concepts.`);
    }

    setTimeout(() => setIsLevelChangedNotification(null), 4000);

    await syncProgressWithAPI({
      userEmail: 'student@example.com',
      topicKey: activeTopicId,
      questionText: currentQuestion.questionText,
      studentAnswer: finalAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect,
      conceptualTrap: feedbackObj.conceptualTrap,
      socraticHint: feedbackObj.hint,
      updatedSkillMatrix: result.updatedMatrix
    });
  };

  // Next Question Action
  const handleNextQuestion = () => {
    const nextQIndex = (currentTopicQuestions.findIndex((q) => q.id === currentQuestion.id) + 1) % currentTopicQuestions.length;
    setCurrentQuestion(currentTopicQuestions[nextQIndex]);
    setSelectedOption('');
    setCustomInput('');
    setFeedback(null);
    setAttemptCount(0);
    setChatHistory([]);
    setShowMobileHintSheet(false);
  };

  return (
    <div className="space-y-6">
      {/* Skill Matrix Visual Grid Header */}
      <TopicSelector
        activeTopicId={activeTopicId}
        onSelectTopic={setActiveTopicId}
        skillMatrix={skillMatrix}
      />

      {/* Adaptive Notification Toast */}
      {isLevelChangedNotification && (
        <div className="bg-gradient-to-r from-emerald-900/80 to-cyan-900/80 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">{isLevelChangedNotification}</span>
          </div>
        </div>
      )}

      {/* Main Question & Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Problem Display, Inline Socratic Card, & Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden">
            
            {/* Topic & Level Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeTopicId.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {getDifficultyLabel(currentQuestion.level)}
                </span>
              </div>

              <button
                onClick={() => setShowScratchpad(!showScratchpad)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 min-h-[36px] ${
                  showScratchpad
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                {showScratchpad ? 'Hide Scratchpad' : 'Scratchpad'}
              </button>
            </div>

            {/* Question Statement */}
            <div className="mb-6 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 shadow-inner">
              <MathRenderer content={currentQuestion.questionText} className="text-base text-slate-100 font-medium" />
            </div>

            {/* Interactive Scratchpad Canvas/Notes area */}
            {showScratchpad && (
              <div className="mb-6 bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 animate-fade-in">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-2">
                  <span className="flex items-center gap-1"><Edit3 className="w-3.5 h-3.5" /> Student Calculation Scratchpad</span>
                  <button onClick={() => setScratchpadText('')} className="text-[10px] text-slate-500 hover:text-slate-300">Clear</button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Type or write your calculation steps here... (e.g. 2x - 5 = 9 => 2x = 14 => x = 7)"
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Multiple Choice Options or Numeric Input */}
            {currentQuestion.options ? (
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  let optionStyle = 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/40';

                  if (feedback) {
                    if (option === currentQuestion.correctAnswer) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !feedback.isCorrect) {
                      optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isEvaluating}
                      onClick={() => setSelectedOption(option)}
                      className={`w-full text-left p-4 min-h-[52px] rounded-2xl border transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <MathRenderer content={option} className="text-sm font-medium" />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Exact Numeric Input */
              <div className="mb-6 space-y-2">
                <label className="text-xs font-semibold text-slate-400">Enter Exact Numerical Answer:</label>
                <input
                  type="text"
                  placeholder="e.g. 52 or -4%"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* 🌟 CRITICAL MOBILE-FIRST ENHANCEMENT: INLINE SOCRATIC AI FEEDBACK CARD */}
            {feedback && (
              <div className="mb-6 p-4 rounded-2xl border animate-fade-in shadow-xl bg-slate-950/90 border-cyan-500/40">
                <div className="flex items-center justify-between mb-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Brain className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-100">
                      {feedback.isCorrect ? 'Correct Solution!' : 'Socratic Micro-Hint'}
                    </span>
                  </div>
                  {feedback.conceptualTrap && feedback.conceptualTrap !== 'None' && (
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Trap: {feedback.conceptualTrap}
                    </span>
                  )}
                </div>

                {/* Socratic Hint Text */}
                <MathRenderer content={feedback.hint} className="text-xs text-slate-200 leading-relaxed mb-2" />

                {/* Step-by-step KaTeX Explanation if correct or attempt >= 2 */}
                {feedback.latexExplanation && (feedback.isCorrect || attemptCount >= 2) && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-xs">
                    <span className="text-cyan-400 font-bold block mb-1">Step-by-Step KaTeX Explanation:</span>
                    <MathRenderer content={feedback.latexExplanation} className="text-xs text-slate-200" />
                  </div>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                disabled={!activeAnswer || isEvaluating}
                onClick={() => handleSubmitAnswer()}
                className="flex-1 py-3.5 px-5 min-h-[48px] rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEvaluating ? (
                  <span>Consulting Socratic Tutor...</span>
                ) : (
                  <>
                    <span>Submit & Check Answer</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {!feedback && (
                <button
                  onClick={() => handleSubmitAnswer("HINT_REQUEST")}
                  disabled={isEvaluating}
                  className="py-3.5 px-4 min-h-[48px] rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Request AI Micro-Hint</span>
                </button>
              )}

              {feedback && (
                <button
                  onClick={handleNextQuestion}
                  className="py-3.5 px-6 min-h-[48px] rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Socratic AI Chat & Micro-Hint Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col h-full min-h-[450px]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-100 m-0">Socratic AI Coach</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Gemini 2.5 Active
              </span>
            </div>

            {/* Chat Conversation History */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[420px] pr-1">
              {chatHistory.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <Lightbulb className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-40 animate-pulse" />
                  <p className="text-xs text-slate-400">
                    Submit your answer or request guidance. QuantSocrates will point out conceptual traps without spoiling the solution.
                  </p>
                </div>
              ) : (
                chatHistory.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    {/* Student Submission Bubble */}
                    <div className="flex justify-end">
                      <div className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-2xl rounded-tr-none text-xs max-w-[85%]">
                        <span className="text-[10px] text-slate-400 block mb-0.5">Your Submission:</span>
                        <MathRenderer content={item.studentAnswer} />
                      </div>
                    </div>

                    {/* Socratic Feedback Card */}
                    <div className={`p-4 rounded-2xl border ${
                      item.isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                        : 'bg-slate-950/80 border-amber-500/40 text-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          {item.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-amber-400" />
                          )}
                          <span className="text-xs font-bold">
                            {item.isCorrect ? 'Correct Solution!' : 'Socratic Micro-Hint'}
                          </span>
                        </div>
                        {item.conceptualTrap && item.conceptualTrap !== 'None' && (
                          <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Trap: {item.conceptualTrap}
                          </span>
                        )}
                      </div>

                      {/* Socratic Hint */}
                      <MathRenderer content={item.hint} className="text-xs text-slate-300 mb-3" />

                      {/* LaTeX Explanation (if correct or 2nd attempt) */}
                      {item.explanation && (item.isCorrect || attemptCount >= 2) && (
                        <div className="mt-3 pt-3 border-t border-slate-800 text-xs">
                          <span className="text-cyan-400 font-bold block mb-1">Step-by-Step KaTeX Explanation:</span>
                          <MathRenderer content={item.explanation} className="text-xs text-slate-200" />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Hint Request Button */}
            {!feedback && (
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleSubmitAnswer("HINT_REQUEST")}
                  disabled={isEvaluating}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Request Socratic Micro-Hint</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 📱 MOBILE FLOATING AI HINT DRAWER TOGGLE (Visible on small screens when feedback exists) */}
      {feedback && showMobileHintSheet && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-900/95 border border-cyan-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-extrabold text-slate-100">
                {feedback.isCorrect ? 'Solution Available!' : 'Socratic AI Hint Ready'}
              </span>
            </div>
            <button onClick={() => setShowMobileHintSheet(false)} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>
          <MathRenderer content={feedback.hint} className="text-xs text-slate-200 line-clamp-2 mb-3" />
          <button
            onClick={() => {
              // Scroll directly to the inline feedback card
              window.scrollTo({ top: 300, behavior: 'smooth' });
              setShowMobileHintSheet(false);
            }}
            className="w-full py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1"
          >
            <span>View Full Explanation</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
