
import React from 'react';
import type { PromotionPlan } from '../types';
import CopyButton from './CopyButton';

interface ResultsDisplayProps {
  plan: PromotionPlan;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode; contentToCopy?: string }> = ({ title, children, contentToCopy }) => (
  <div className="bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 overflow-hidden mb-6">
    <div className="p-4 bg-gray-900/50 flex justify-between items-center">
      <h3 className="text-xl font-semibold text-red-400">{title}</h3>
      {contentToCopy && <CopyButton textToCopy={contentToCopy} />}
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ plan }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <ResultCard title="YouTube Titles" contentToCopy={plan.titles.join('\n')}>
        <ul className="space-y-3 list-inside">
          {plan.titles.map((title, index) => (
            <li key={index} className="text-gray-300 flex items-start">
                <span className="text-red-500 mr-3 mt-1">&#10148;</span>
                <span>{title}</span>
            </li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="Video Description" contentToCopy={plan.description}>
        <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{plan.description}</p>
      </ResultCard>

      <div className="grid md:grid-cols-3 gap-6">
        <ResultCard title="Twitter Post" contentToCopy={plan.socialPosts.twitter}>
            <p className="text-gray-300 whitespace-pre-wrap text-sm">{plan.socialPosts.twitter}</p>
        </ResultCard>
        <ResultCard title="Facebook Post" contentToCopy={plan.socialPosts.facebook}>
            <p className="text-gray-300 whitespace-pre-wrap text-sm">{plan.socialPosts.facebook}</p>
        </ResultCard>
        <ResultCard title="Instagram Caption" contentToCopy={plan.socialPosts.instagram}>
            <p className="text-gray-300 whitespace-pre-wrap text-sm">{plan.socialPosts.instagram}</p>
        </ResultCard>
      </div>

      <ResultCard title="Hashtags" contentToCopy={plan.hashtags.join(' ')}>
        <div className="flex flex-wrap gap-2">
          {plan.hashtags.map((tag, index) => (
            <span key={index} className="bg-gray-700 text-red-300 text-xs font-medium px-2.5 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </ResultCard>
    </div>
  );
};

export default ResultsDisplay;
