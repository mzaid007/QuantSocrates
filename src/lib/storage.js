import { INITIAL_SKILL_MATRIX } from './adaptiveEngine';

const STORAGE_KEYS = {
  SKILL_MATRIX: 'quantsocrates_skill_matrix',
  ERROR_LOGS: 'quantsocrates_error_logs',
  DIAGNOSTIC_DONE: 'quantsocrates_diagnostic_done',
  USER_PROFILE: 'quantsocrates_user_profile'
};

/**
 * Get Local Skill Matrix
 */
export function getLocalSkillMatrix() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SKILL_MATRIX);
    if (!raw) return INITIAL_SKILL_MATRIX;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read skillMatrix from LocalStorage', e);
    return INITIAL_SKILL_MATRIX;
  }
}

/**
 * Save Local Skill Matrix
 */
export function saveLocalSkillMatrix(matrix) {
  try {
    localStorage.setItem(STORAGE_KEYS.SKILL_MATRIX, JSON.stringify(matrix));
  } catch (e) {
    console.warn('Failed to save skillMatrix to LocalStorage', e);
  }
}

/**
 * Get Local Error Logs
 */
export function getLocalErrorLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ERROR_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/**
 * Save Local Error Log Item
 */
export function saveLocalErrorLog(errorItem) {
  try {
    const current = getLocalErrorLogs();
    const newItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...errorItem
    };
    const updated = [newItem, ...current];
    localStorage.setItem(STORAGE_KEYS.ERROR_LOGS, JSON.stringify(updated.slice(0, 100)));
    return updated;
  } catch (e) {
    console.warn('Failed to save error log to LocalStorage', e);
    return [];
  }
}

/**
 * Check if Diagnostic Test is completed
 */
export function isDiagnosticCompleted() {
  return localStorage.getItem(STORAGE_KEYS.DIAGNOSTIC_DONE) === 'true';
}

/**
 * Mark Diagnostic Test completed
 */
export function setDiagnosticCompleted(done = true) {
  localStorage.setItem(STORAGE_KEYS.DIAGNOSTIC_DONE, done ? 'true' : 'false');
}

/**
 * Synchronize Problem Result with Serverless API (MongoDB) with graceful LocalStorage fallback
 */
export async function syncProgressWithAPI(payload) {
  // Always save locally first for instant feedback
  if (payload.updatedSkillMatrix) {
    saveLocalSkillMatrix(payload.updatedSkillMatrix);
  }
  if (!payload.isCorrect && payload.questionText) {
    saveLocalErrorLog({
      topic: payload.topicName || payload.topicKey,
      questionText: payload.questionText,
      studentAnswer: payload.studentAnswer,
      correctAnswer: payload.correctAnswer,
      conceptualTrap: payload.conceptualTrap || 'General Conceptual Gap',
      socraticHint: payload.socraticHint || 'Review formulas and steps.'
    });
  }

  // Attempt serverless API sync
  try {
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.info('API returned non-200 status, using LocalStorage state.');
      return { dbConnected: false };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.info('Network/API offline, saved securely in LocalStorage.');
    return { dbConnected: false };
  }
}
