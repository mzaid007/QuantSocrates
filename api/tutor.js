import { GoogleGenAI } from '@google/genai';

/**
 * Serverless API Endpoint: /api/tutor
 * Evaluates student responses and streams Socratic feedback using Google Gemini (gemini-2.5-flash).
 */
export default async function handler(req, res) {
  // CORS setup for Vercel functions
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
    const { questionText, studentAnswer, correctAnswer, topic, difficultyLevel, isFirstAttempt } = req.body || {};

    if (!questionText || studentAnswer === undefined) {
      return res.status(400).json({ error: 'Missing required payload: questionText or studentAnswer' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is configured in environment, return a smart fallback Socratic response
    if (!apiKey) {
      const isMatch = String(studentAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
      return res.status(200).json({
        isCorrect: isMatch,
        hint: isMatch
          ? "Great work! You correctly solved this problem."
          : `Hint: Re-check your operational steps. Did you check for common trap in ${topic || 'Quant'}: multiplicative vs additive percentage shifts?`,
        conceptualTrap: isMatch ? "None" : "Additive Fallacy / Execution Slip",
        latexExplanation: `The target answer is **${correctAnswer}**. Verify equation constraints carefully.`,
        fallbackMode: true
      });
    }

    // Initialize Official GoogleGenAI SDK with options object
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are QuantSocrates, an expert MBA Math Tutor specializing in CAT, GMAT, and GRE quantitative reasoning.
Your goal is to guide students using pure SOCRATIC METHODOLOGY.

RULES:
1. Never give away the answer outright on an incorrect response if it's the student's first attempt. Instead, guide them with a focused Socratic question that points to where their reasoning broke down.
2. Identify common MBA quant traps (e.g., "Ignoring negative square roots", "Miscalculating weighted averages", "Assuming integer variables in Data Sufficiency", "Off-by-one errors", "Failing to check boundary constraints").
3. Format all math notation in clean KaTeX LaTeX syntax (e.g. $x^2 + y^2 = r^2$, $\\frac{a}{b}$, $\\sqrt{n}$).
4. YOU MUST RESPOND WITH A VALID JSON OBJECT ONLY. NO MARKDOWN CODEBLOCKS AROUND THE JSON.

JSON Schema required:
{
  "isCorrect": boolean,
  "hint": "Socratic guidance question or encouraging hint",
  "conceptualTrap": "Identified conceptual trap or error type",
  "latexExplanation": "Full step-by-step KaTeX solution"
}`;

    const userPrompt = `
Topic: ${topic || 'Quant Reasoning'} (Difficulty Level ${difficultyLevel || 3}/5)
Question: "${questionText}"
Expected Correct Answer: "${correctAnswer}"
Student Submission: "${studentAnswer}"
Attempt Count: ${isFirstAttempt ? '1st Attempt' : 'Follow-up Attempt'}

Evaluate the student's answer. Respond STRICTLY in valid JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n' + userPrompt }] }
      ],
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '';
    
    let parsed;
    try {
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Gemini JSON Parse Error:", parseError, "Raw output:", responseText);
      const isMatch = String(studentAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
      parsed = {
        isCorrect: isMatch,
        hint: isMatch
          ? "Spot on! Excellent quantitative intuition."
          : "Review the question statement carefully. What information might you have overlooked?",
        conceptualTrap: isMatch ? "None" : "Execution Slip",
        latexExplanation: `The correct answer is $${correctAnswer}$.`
      };
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Tutor API Error:', error);
    // Return graceful Socratic response if Gemini API call encounters errors
    const isMatch = String(studentAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
    return res.status(200).json({
      isCorrect: isMatch,
      hint: isMatch
        ? "Correct answer! Excellent quantitative reasoning."
        : "Hint: Review your initial assumptions. Did you test all edge cases or boundary conditions?",
      conceptualTrap: isMatch ? "None" : "Conceptual Gap",
      latexExplanation: `The target solution is $${correctAnswer}$.`,
      fallbackMode: true
    });
  }
}
