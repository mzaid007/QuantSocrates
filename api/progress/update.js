import connectDB from '../lib/db.js';
import User from '../models/User.js';
import ErrorLog from '../models/ErrorLog.js';

/**
 * Serverless API Endpoint: /api/progress/update
 * Updates student skillMatrix in MongoDB and logs errors if answer is incorrect.
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
    const db = await connectDB();
    const { userEmail = 'student@example.com', topicKey, topicName, questionText, studentAnswer, correctAnswer, isCorrect, conceptualTrap, socraticHint, updatedSkillMatrix } = req.body || {};

    if (!db) {
      // MongoDB unconfigured or unreachable -> signal client to use localStorage
      return res.status(200).json({
        dbConnected: false,
        message: 'MongoDB URI not configured or unavailable; progress saved in LocalStorage.'
      });
    }

    // 1. Update or create User profile document
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = new User({ email: userEmail });
    }

    user.totalSolved = (user.totalSolved || 0) + 1;
    
    if (updatedSkillMatrix) {
      user.skillMatrix = updatedSkillMatrix;
    }

    // Calculate overall accuracy
    if (user.skillMatrix) {
      const topicAccs = Object.values(user.skillMatrix).map(t => t.accuracy || 0);
      user.overallAccuracy = Math.round(topicAccs.reduce((a, b) => a + b, 0) / topicAccs.length);
    }
    user.updatedAt = new Date();
    await user.save();

    // 2. Log Error document if answer is incorrect
    let createdErrorLog = null;
    if (!isCorrect && questionText) {
      createdErrorLog = await ErrorLog.create({
        userId: user._id,
        userEmail: userEmail,
        topic: topicName || topicKey || 'Quant',
        questionText,
        studentAnswer: String(studentAnswer),
        correctAnswer: String(correctAnswer),
        conceptualTrap: conceptualTrap || 'General Conceptual Gap',
        socraticHint: socraticHint || 'Review steps and formulas.',
        createdAt: new Date()
      });
    }

    return res.status(200).json({
      dbConnected: true,
      user,
      errorLog: createdErrorLog
    });
  } catch (error) {
    console.error('Progress Update Error:', error);
    return res.status(500).json({
      dbConnected: false,
      error: 'Failed to sync progress to MongoDB',
      details: error.message
    });
  }
}
