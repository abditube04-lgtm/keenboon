
import { GoogleGenAI, Type } from "@google/genai";
import type { PromotionPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const promotionPlanSchema = {
  type: Type.OBJECT,
  properties: {
    titles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 engaging and SEO-friendly YouTube video titles."
    },
    description: {
      type: Type.STRING,
      description: "A detailed and compelling YouTube video description, including sections for hooks, summary, timestamps (placeholders), and calls to action."
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 10-15 relevant hashtags, including a mix of broad and niche tags."
    },
    socialPosts: {
      type: Type.OBJECT,
      properties: {
        twitter: { type: Type.STRING, description: "A short, punchy tweet to promote the video, including a call to action and relevant hashtags." },
        facebook: { type: Type.STRING, description: "A slightly longer Facebook post to engage the audience, asking a question and encouraging clicks." },
        instagram: { type: Type.STRING, description: "An engaging Instagram caption, suitable for a post or reel, that teases the video content." },
      },
      required: ['twitter', 'facebook', 'instagram']
    }
  },
  required: ['titles', 'description', 'hashtags', 'socialPosts']
};

export async function generatePromotionPlan(videoTopic: string, videoTone: string): Promise<PromotionPlan> {
  const prompt = `
    Create a complete promotional plan for a YouTube video.
    Video Topic: "${videoTopic}"
    Desired Tone: "${videoTone}"
    
    Generate the following assets:
    - 5 viral, click-worthy, and SEO-optimized titles.
    - A full video description with a strong hook, detailed summary, and calls to action.
    - 15 relevant hashtags.
    - Promotional posts for Twitter, Facebook, and Instagram.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class YouTube growth strategist and social media marketing expert. Your goal is to create compelling promotional content that maximizes video visibility and engagement.",
      responseMimeType: "application/json",
      responseSchema: promotionPlanSchema,
      temperature: 0.8,
      topP: 0.9,
    }
  });

  const jsonText = response.text.trim();
  try {
    const plan = JSON.parse(jsonText);
    return plan;
  } catch (error) {
    console.error("Failed to parse Gemini JSON response:", jsonText);
    throw new Error("The AI returned an invalid format. Please try again.");
  }
}
