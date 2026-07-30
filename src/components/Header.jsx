import React from 'react';
import { Brain, Trophy, AlertTriangle, RefreshCw, Database, Sparkles, UserCheck, Cloud } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  overallStats,
  onResetDiagnostic,
  dbStatus,
  userEmail,
  onOpenSyncModal
}) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Brain className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent my-0">
                QuantSocrates
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> CAT / GMAT AI
              </span>
            </div>
            <p className="text-xs text-slate-400">IRT Adaptive Math Tutor & Socratic AI Coach</p>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center gap-6 bg-slate-950/60 border border-slate-800/80 px-4 py-1.5 rounded-xl">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Accuracy</p>
            <p className="text-sm font-extrabold text-emerald-400">{overallStats.overallAccuracy}%</p>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Solved</p>
            <p className="text-sm font-extrabold text-cyan-400">{overallStats.totalSolved}</p>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Avg Level</p>
            <p className="text-sm font-extrabold text-amber-400">L{overallStats.averageLevel}</p>
          </div>
        </div>

        {/* Navigation Tabs, Cloud Sync & DB Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Practice Hub
          </button>

          <button
            onClick={() => setActiveTab('errorLog')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'errorLog'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Error Log
          </button>

          {/* Sync / Resume Session Button */}
          <button
            onClick={onOpenSyncModal}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm"
            title="Save or resume cloud session using your email"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span className="max-w-[100px] truncate">{userEmail ? userEmail.split('@')[0] : 'Sync Session'}</span>
          </button>

          {/* Database Sync Status Badge */}
          <div
            className={`hidden lg:flex items-center gap-1 px-2 py-1 text-[11px] rounded-lg border ${
              dbStatus
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title={dbStatus ? "Synced to MongoDB Atlas Free Tier" : "Saved locally (LocalStorage fallback)"}
          >
            <Database className="w-3 h-3" />
            <span>{dbStatus ? 'MongoDB Online' : 'Local'}</span>
          </div>

          <button
            onClick={onResetDiagnostic}
            title="Reset diagnostic test and restart level progression"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
