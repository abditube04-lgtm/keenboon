
import React, { useState, useCallback } from 'react';
import { generatePromotionPlan } from './services/geminiService';
import type { PromotionPlan } from './types';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [promotionPlan, setPromotionPlan] = useState<PromotionPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (videoTopic: string, videoTone: string) => {
    if (!videoTopic.trim()) {
      setError('Please enter a video topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPromotionPlan(null);

    try {
      const plan = await generatePromotionPlan(videoTopic, videoTone);
      setPromotionPlan(plan);
    } catch (e) {
      console.error(e);
      setError('Failed to generate promotion plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            YouTube Promotion Studio
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Generate viral titles, descriptions, and social media posts for your next video using AI.
          </p>
        </header>
        
        <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-2xl shadow-2xl shadow-red-900/20 p-6 md:p-8 backdrop-blur-sm border border-gray-700">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
          {isLoading && <LoadingSpinner />}
          {error && <div className="text-center p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}
          {promotionPlan && !isLoading && <ResultsDisplay plan={promotionPlan} />}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
