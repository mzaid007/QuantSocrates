import React, { useState } from 'react';
import MathRenderer from './MathRenderer';
import { AlertTriangle, Filter, Search, Trash2, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ErrorLog({ errorLogs, onRetryQuestion, onClearLogs }) {
  const [filterTrap, setFilterTrap] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique conceptual traps
  const traps = ['ALL', ...new Set(errorLogs.map((log) => log.conceptualTrap || 'General Trap'))];

  const filteredLogs = errorLogs.filter((log) => {
    const matchesTrap = filterTrap === 'ALL' || log.conceptualTrap === filterTrap;
    const matchesSearch =
      log.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.conceptualTrap?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTrap && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Conceptual Error Log & Vulnerability Matrix
          </h2>
          <p className="text-xs text-slate-400">
            Review past missed problems tagged by Socratic trap analysis to build exam immunity.
          </p>
        </div>

        {errorLogs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="px-3.5 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by topic, question keywords, or trap name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category filter dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterTrap}
            onChange={(e) => setFilterTrap(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
          >
            {traps.map((t, i) => (
              <option key={i} value={t}>{t === 'ALL' ? 'All Trap Categories' : t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List of Error Log Cards */}
      {filteredLogs.length > 0 ? (
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <div
              key={log.id || index}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    {log.conceptualTrap || 'Conceptual Trap'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 bg-slate-800 rounded-md">
                    {log.topic}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>

              {/* Question Statement */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mb-4">
                <MathRenderer content={log.questionText} className="text-sm text-slate-200" />
              </div>

              {/* Answer comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-rose-950/30 border border-rose-900/50 p-3 rounded-xl">
                  <span className="text-rose-400 font-semibold block mb-1">Your Submission:</span>
                  <MathRenderer content={log.studentAnswer} className="text-rose-200 font-mono" />
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded-xl">
                  <span className="text-emerald-400 font-semibold block mb-1">Target Answer:</span>
                  <MathRenderer content={log.correctAnswer} className="text-emerald-200 font-mono" />
                </div>
              </div>

              {/* Socratic Hint / Trap Explanation */}
              {log.socraticHint && (
                <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-3.5 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold block mb-1">Socratic AI Insight:</span>
                  <MathRenderer content={log.socraticHint} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-200 m-0">No Error Logs Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {errorLogs.length === 0
              ? 'Great job! As you work through practice problems, missed questions will be recorded here.'
              : 'No errors match your current search and trap filter.'}
          </p>
        </div>
      )}
    </div>
  );
}
