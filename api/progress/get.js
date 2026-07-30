import connectDB from '../lib/db.js';
import User from '../models/User.js';
import ErrorLog from '../models/ErrorLog.js';

/**
 * Serverless API Endpoint: /api/progress/get
 * Retrieves student profile & error logs from MongoDB.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await connectDB();
    const email = req.query.email || 'student@example.com';

    if (!db) {
      return res.status(200).json({ dbConnected: false });
    }

    const user = await User.findOne({ email });
    const errorLogs = await ErrorLog.find({ userEmail: email }).sort({ createdAt: -1 }).limit(50);

    return res.status(200).json({
      dbConnected: true,
      user,
      errorLogs
    });
  } catch (error) {
    console.error('Fetch Progress Error:', error);
    return res.status(500).json({ dbConnected: false, error: error.message });
  }
}
