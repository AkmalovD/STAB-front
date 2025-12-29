import React, { useState } from 'react';
import { Phase, Task } from '@/types';
import { getPhaseProgress } from '@/utils/journeyData';

interface PhaseCardProps {
  phase: Phase;
  onTaskToggle: (phaseId: string, taskId: string) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onTaskToggle }) => {
  const [isExpanded, setIsExpanded] = useState(phase.status === 'in-progress');
  const progress = getPhaseProgress(phase);

  const getStatusBadge = () => {
    switch (phase.status) {
      case 'completed':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✓ Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🔄 In Progress
          </span>
        );
      case 'not-started':
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            ⏸️ Not Started
          </span>
        );
      case 'locked':
        return (
          <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-sm font-medium">
            🔒 Locked
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-orange-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
        phase.status === 'locked' ? 'opacity-60' : 'hover:shadow-lg'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => phase.status !== 'locked' && setIsExpanded(!isExpanded)}
        disabled={phase.status === 'locked'}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{phase.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[#0d171b]">
                  Phase {phase.number}: {phase.title}
                </h3>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-[#4c809a]">{phase.description}</p>
              <p className="text-xs text-gray-500 mt-1">⏱️ {phase.timeframe}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-[#0d98ba]">{progress}%</div>
              <div className="text-xs text-gray-500">
                {phase.tasks.filter((t) => t.completed).length}/{phase.tasks.length}
              </div>
            </div>
            {phase.status !== 'locked' && (
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              progress === 100 ? 'bg-green-500' : 'bg-[#0d98ba]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </button>

      {/* Expanded Content - Tasks */}
      {isExpanded && phase.status !== 'locked' && (
        <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
          {phase.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onTaskToggle(phase.id, task.id)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0d98ba] focus:ring-[#0d98ba] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? 'text-gray-400 line-through'
                          : 'text-gray-900 group-hover:text-[#0d98ba]'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(
                      task.priority
                    )} bg-gray-100`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {phase.status === 'not-started' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Complete previous phases to unlock this section
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhaseCard;
