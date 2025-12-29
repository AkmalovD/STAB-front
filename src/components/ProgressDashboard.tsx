import React from 'react';
import { Phase } from '@/types';
import { calculateOverallProgress, getDaysUntilDate } from '@/utils/journeyData';

interface ProgressDashboardProps {
  phases: Phase[];
  startDate: Date;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ phases, startDate }) => {
  const overallProgress = calculateOverallProgress(phases);
  const daysUntil = getDaysUntilDate(startDate);
  
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.filter((task) => task.completed).length,
    0
  );

  const currentPhase = phases.find((phase) => phase.status === 'in-progress') || phases[0];

  return (
    <div className="bg-gradient-to-br from-[#0d98ba] to-[#13a4ec] rounded-2xl p-8 text-white shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Your Journey Progress</h2>
          <p className="text-white/80">Keep going! You're doing great 🎉</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold">{overallProgress}%</div>
          <div className="text-white/80 text-sm">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-white/20 rounded-full h-4">
          <div
            className="bg-white h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${overallProgress}%` }}
          >
            {overallProgress > 10 && (
              <span className="text-xs font-bold text-[#0d98ba]">{overallProgress}%</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">📅</div>
            <div className="text-sm text-white/80">Days Until Start</div>
          </div>
          <div className="text-3xl font-bold">
            {daysUntil > 0 ? daysUntil : 'Started!'}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {daysUntil > 0 ? `${Math.floor(daysUntil / 30)} months away` : 'Your journey has begun'}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">✅</div>
            <div className="text-sm text-white/80">Tasks Progress</div>
          </div>
          <div className="text-3xl font-bold">
            {completedTasks}/{totalTasks}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {totalTasks - completedTasks} tasks remaining
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">{currentPhase.icon}</div>
            <div className="text-sm text-white/80">Current Phase</div>
          </div>
          <div className="text-xl font-bold">
            Phase {currentPhase.number}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {currentPhase.title}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-6 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <span>🎯</span>
          <span>What to do next?</span>
        </h3>
        <div className="space-y-2">
          {phases
            .flatMap((phase) => phase.tasks)
            .filter((task) => !task.completed && task.priority === 'High')
            .slice(0, 3)
            .map((task) => (
              <div key={task.id} className="text-sm text-white/90 flex items-start gap-2">
                <span className="text-yellow-300">▸</span>
                <span>{task.title}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
