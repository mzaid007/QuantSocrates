import React from 'react';
import { TOPICS } from '../lib/questionBank';
import { Calculator, Variable, Shapes, Dices, Scale, ChevronRight, Zap } from 'lucide-react';
import { getDifficultyLabel } from '../lib/adaptiveEngine';

const iconMap = {
  Calculator: Calculator,
  Variable: Variable,
  Shapes: Shapes,
  Dices: Dices,
  Scale: Scale
};

export default function TopicSelector({ activeTopicId, onSelectTopic, skillMatrix }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 md:p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 m-0">
            <Zap className="w-4 h-4 text-emerald-400" />
            Quant Skill Matrix
          </h2>
          <p className="text-xs text-slate-400">Select a topic to launch adaptive practice sessions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {TOPICS.map((topic) => {
          const IconComponent = iconMap[topic.icon] || Calculator;
          const stats = skillMatrix[topic.id] || { level: 1, accuracy: 0, totalSolved: 0 };
          const isActive = activeTopicId === topic.id;

          // Calculate visual progress percentage based on level 1 to 5
          const levelProgressPercent = (stats.level / 5) * 100;

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                isActive
                  ? 'bg-slate-800/90 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              {/* Active Topic Top Indicator bar */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
              )}

              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20">
                  L{stats.level}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 m-0 mb-1 flex items-center justify-between">
                {topic.name}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </h3>
              
              <p className="text-[11px] text-slate-400 line-clamp-1 mb-3">{topic.desc}</p>

              {/* Progress Bar & Stats */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Mastery</span>
                  <span className="font-mono text-emerald-400">{stats.accuracy}% ({stats.totalSolved || 0})</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${levelProgressPercent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
