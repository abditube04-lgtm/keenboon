
import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (topic: string, tone: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Engaging');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic, tone);
  };

  const toneOptions = ['Engaging', 'Professional', 'Humorous', 'Informative', 'Inspirational', 'Dramatic'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
          Video Topic or Description
        </label>
        <textarea
          id="topic"
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-200 p-3 placeholder-gray-500"
          placeholder="e.g., A 10-minute guide to making the perfect sourdough bread at home"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">
          Desired Tone
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-200 p-3"
          disabled={isLoading}
        >
          {toneOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 disabled:bg-red-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? 'Generating...' : 'Generate Promotion Plan'}
      </button>
    </form>
  );
};

export default InputForm;
