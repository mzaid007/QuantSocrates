import mongoose from 'mongoose';

const ErrorLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userEmail: { type: String, required: true, index: true },
  topic: { type: String, required: true },
  questionText: { type: String, required: true },
  studentAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  conceptualTrap: { type: String, default: 'General Conceptual Gap' },
  socraticHint: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ErrorLog || mongoose.model('ErrorLog', ErrorLogSchema);
