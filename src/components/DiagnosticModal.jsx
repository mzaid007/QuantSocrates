import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../lib/questionBank';
import MathRenderer from './MathRenderer';
import { Brain, CheckCircle2, ArrowRight, Award, Sparkles } from 'lucide-react';

export default function DiagnosticModal({ onCompleteDiagnostic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [evaluatedResult, setEvaluatedResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleNext = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswers = [
      ...answers,
      {
        topicKey: currentQuestion.topicKey,
        topicName: currentQuestion.topicName,
        isCorrect,
        studentAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer
      }
    ];

    setAnswers(newAnswers);
    setSelectedOption('');

    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Diagnostic complete -> Send to /api/diagnose or evaluate locally
      submitDiagnostic(newAnswers);
    }
  };

  const submitDiagnostic = async (finalAnswers) => {
    setLoading(true);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers })
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluatedResult(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      // Fallback local evaluation
      let correctCount = 0;
      const matrix = {
        arithmetic: { level: 1, accuracy: 0 },
        algebra: { level: 1, accuracy: 0 },
        geometry: { level: 1, accuracy: 0 },
        modernMath: { level: 1, accuracy: 0 },
        dataSufficiency: { level: 1, accuracy: 0 }
      };

      finalAnswers.forEach((ans) => {
        if (ans.isCorrect) correctCount += 1;
        const key = ans.topicKey;
        if (matrix[key]) {
          matrix[key].level = ans.isCorrect ? 2 : 1;
          matrix[key].accuracy = ans.isCorrect ? 100 : 0;
        }
      });

      setEvaluatedResult({
        overallAccuracy: Math.round((correctCount / finalAnswers.length) * 100),
        skillMatrix: matrix
      });
    } finally {
      setLoading(false);
      setIsFinished(true);
    }
  };

  const handleStart = () => {
    if (evaluatedResult && onCompleteDiagnostic) {
      onCompleteDiagnostic(evaluatedResult.skillMatrix);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl shadow-emerald-500/10 relative">
        
        {!isFinished ? (
          <div>
            {/* Header & Step progress */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100 m-0">CAT / GMAT Quant Onboarding</h2>
                  <p className="text-xs text-slate-400">Baseline Assessment ({currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length})</p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Topic: {currentQuestion.topicName}
              </span>
            </div>

            {/* Question Text */}
            <div className="mb-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
              <MathRenderer content={currentQuestion.questionText} className="text-base text-slate-200" />
            </div>

            {/* MCQ Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <MathRenderer content={opt} className="text-sm font-medium" />
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 font-bold" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                disabled={!selectedOption || loading}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? 'Evaluating Baseline...' : currentIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Splash Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/10">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-100 mb-2 m-0">Diagnostic Profile Created!</h2>
            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
              Your initial Quant Skill Matrix has been calibrated based on your responses.
            </p>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 mb-8 max-w-md mx-auto text-left">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Calculated Baseline Matrix</span>
                <span className="text-emerald-400 font-mono">Accuracy: {evaluatedResult?.overallAccuracy}%</span>
              </h3>
              <div className="space-y-2">
                {Object.entries(evaluatedResult?.skillMatrix || {}).map(([key, stat]) => (
                  <div key={key} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50 last:border-0">
                    <span className="capitalize text-slate-300 font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold font-mono">
                      Level {stat.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" /> Launch QuantSocrates Practice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
