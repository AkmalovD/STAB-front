import React from 'react';
import { Document } from '@/types';

interface DocumentStatusProps {
  documents: Document[];
  onStatusChange?: (docId: string, newStatus: Document['status']) => void;
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({ documents, onStatusChange }) => {
  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'missing':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return '✓';
      case 'in-progress':
        return '⏳';
      case 'missing':
        return '✗';
      default:
        return '○';
    }
  };

  const categoryGroups = documents.reduce((groups, doc) => {
    if (!groups[doc.category]) {
      groups[doc.category] = [];
    }
    groups[doc.category].push(doc);
    return groups;
  }, {} as Record<string, Document[]>);

  const categoryIcons: Record<string, string> = {
    Personal: '👤',
    Academic: '🎓',
    Tests: '📝',
    Application: '📄',
    Financial: '💰',
  };

  const readyCount = documents.filter((d) => d.status === 'ready').length;
  const totalRequired = documents.filter((d) => d.required).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0d171b] mb-2">Document Checklist</h2>
          <p className="text-[#4c809a]">Track all required documents for your application</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#0d98ba]">
            {readyCount}/{totalRequired}
          </div>
          <div className="text-sm text-gray-600">Ready</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-[#0d98ba] h-3 rounded-full transition-all"
            style={{ width: `${(readyCount / totalRequired) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {totalRequired - readyCount} documents remaining
        </p>
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {Object.entries(categoryGroups).map(([category, docs]) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{categoryIcons[category] || '📁'}</span>
              <h3 className="font-bold text-lg text-gray-900">{category}</h3>
              <span className="text-sm text-gray-500">
                ({docs.filter((d) => d.status === 'ready').length}/{docs.length})
              </span>
            </div>
            <div className="space-y-2">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        {doc.required && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      {doc.expiryDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Expires: {doc.expiryDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {onStatusChange && (
                    <select
                      value={doc.status}
                      onChange={(e) => onStatusChange(doc.id, e.target.value as Document['status'])}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0d98ba] focus:border-transparent"
                    >
                      <option value="missing">Missing</option>
                      <option value="in-progress">In Progress</option>
                      <option value="ready">Ready</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Tip:</span> Start gathering documents early! 
          Some documents like transcripts and recommendation letters can take weeks to obtain.
        </p>
      </div>
    </div>
  );
};

export default DocumentStatus;
