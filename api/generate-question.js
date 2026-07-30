import { GoogleGenAI } from '@google/genai';
import { QUESTION_BANK } from '../../src/lib/questionBank.js';

/**
 * Serverless API Endpoint: /api/generate-question
 * Generates fresh, infinite CAT / GMAT / GRE quant questions on-demand using Gemini (gemini-2.5-flash).
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { topic = 'arithmetic', topicName = 'Arithmetic', difficultyLevel = 3 } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;

    // Helper fallback if API key unconfigured
    const getRandomBankQuestion = () => {
      const topicQuestions = QUESTION_BANK[topic] || QUESTION_BANK.arithmetic;
      const matched = topicQuestions.filter(q => q.level === difficultyLevel);
      const pool = matched.length > 0 ? matched : topicQuestions;
      const question = pool[Math.floor(Math.random() * pool.length)];
      return {
        ...question,
        id: `gen_fallback_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        isAiGenerated: true
      };
    };

    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      return res.status(200).json(getRandomBankQuestion());
    }

    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    const systemPrompt = `You are QuantSocrates, a Principal Exam Creator for CAT, GMAT, and GRE Quantitative Reasoning.
Your task is to generate a BRAND NEW, HIGH-YIELD quantitative math question.

CONSTRAINTS:
1. Topic: ${topicName} (Internal ID: ${topic})
2. Target IRT Difficulty Level: Level ${difficultyLevel}/5 (${
      difficultyLevel === 1 ? 'Foundational / Basic Concept' :
      difficultyLevel === 2 ? 'Easy Exam Level' :
      difficultyLevel === 3 ? 'Medium CAT / GMAT 600-650' :
      difficultyLevel === 4 ? 'Hard CAT / GMAT 680-720' : 'Elite CAT 99+ Percentile / GMAT 720+'
    })
3. Formatted strictly with clean KaTeX LaTeX syntax (e.g. $x^2 + y^2 = r^2$, $\\frac{a}{b}$, $\\sqrt{n}$).
4. Include 4 distinct multiple choice options.
5. Identify the primary conceptual trap (e.g., "Additive Fallacy", "Sign Flop", "Base Change Error", "Extraneous Log Root", "Inclusion-Exclusion Overlap").
6. RESPOND STRICTLY WITH VALID JSON ONLY. NO MARKDOWN CODEBLOCKS.

JSON Schema required:
{
  "id": "gen_unique_id",
  "level": ${difficultyLevel},
  "questionText": "Formatted question statement with KaTeX math",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Exact matching text from options",
  "targetNumeric": "Numeric or short string answer",
  "trap": "Name of conceptual trap",
  "explanation": "Step-by-step KaTeX formatted solution"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] }
      ],
      config: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '';
    let parsed;
    try {
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleanedText);
      parsed.isAiGenerated = true;
      if (!parsed.id) parsed.id = `gen_${Date.now()}`;
    } catch (parseError) {
      console.error("Gemini Question Generator Parse Error:", parseError, responseText);
      parsed = getRandomBankQuestion();
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Question Generator API Error:', error);
    const topicQuestions = QUESTION_BANK[req.body?.topic || 'arithmetic'] || QUESTION_BANK.arithmetic;
    const question = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
    return res.status(200).json({
      ...question,
      id: `gen_err_${Date.now()}`,
      isAiGenerated: true
    });
  }
}
