import { GoogleGenAI } from '@google/genai';

/**
 * Serverless API Endpoint: /api/diagnose
 * Evaluates student onboarding diagnostic responses and returns initial Skill Matrix.
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
    const { answers } = req.body || {}; // array of { topic, isCorrect, level }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid payload: answers array required' });
    }

    // Calculate baseline levels per topic
    const topicStats = {
      arithmetic: { correct: 0, total: 0, level: 1 },
      algebra: { correct: 0, total: 0, level: 1 },
      geometry: { correct: 0, total: 0, level: 1 },
      modernMath: { correct: 0, total: 0, level: 1 },
      dataSufficiency: { correct: 0, total: 0, level: 1 }
    };

    answers.forEach((ans) => {
      const key = ans.topicKey || ans.topic?.toLowerCase().replace(/\s+/g, '');
      if (topicStats[key]) {
        topicStats[key].total += 1;
        if (ans.isCorrect) topicStats[key].correct += 1;
      }
    });

    const skillMatrix = {};
    let totalCorrect = 0;
    let totalQuestions = answers.length;

    Object.keys(topicStats).forEach((key) => {
      const stat = topicStats[key];
      const acc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 50;
      let level = 1;
      if (acc >= 80) level = 3;
      else if (acc >= 50) level = 2;
      else level = 1;

      if (stat.correct > 0) totalCorrect += stat.correct;

      skillMatrix[key] = {
        level,
        accuracy: acc
      };
    });

    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return res.status(200).json({
      overallAccuracy,
      totalSolved: totalQuestions,
      skillMatrix,
      diagnosticSummary: `Baseline evaluation completed. Starting levels range from Level 1 to Level ${Math.max(...Object.values(skillMatrix).map(s => s.level))}.`
    });
  } catch (error) {
    console.error('Diagnose API Error:', error);
    return res.status(500).json({ error: 'Diagnostic evaluation failed' });
  }
}
