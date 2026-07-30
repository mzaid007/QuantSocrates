import mongoose from 'mongoose';

const SkillTopicSchema = new mongoose.Schema({
  level: { type: Number, default: 1, min: 1, max: 5 },
  accuracy: { type: Number, default: 0, min: 0, max: 100 },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  overallAccuracy: { type: Number, default: 0 },
  totalSolved: { type: Number, default: 0 },
  skillMatrix: {
    arithmetic: { type: SkillTopicSchema, default: () => ({ level: 1, accuracy: 0 }) },
    algebra: { type: SkillTopicSchema, default: () => ({ level: 1, accuracy: 0 }) },
    geometry: { type: SkillTopicSchema, default: () => ({ level: 1, accuracy: 0 }) },
    modernMath: { type: SkillTopicSchema, default: () => ({ level: 1, accuracy: 0 }) },
    dataSufficiency: { type: SkillTopicSchema, default: () => ({ level: 1, accuracy: 0 }) }
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
