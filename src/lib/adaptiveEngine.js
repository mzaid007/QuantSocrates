/**
 * Adaptive Engine Logic (IRT-Inspired 5-Level Difficulty Adaptation)
 * 
 * Rules:
 * 1. Range: Level 1 (Foundational) to Level 5 (Advanced/GMAT 700+).
 * 2. 2 consecutive correct answers in a topic -> Increase difficulty (+1, max 5).
 * 3. 1 incorrect answer in a topic -> Decrease difficulty (-1, min 1).
 * 4. Tracks accuracy, streaks, and skill matrix state per topic.
 */

export const INITIAL_SKILL_MATRIX = {
  arithmetic: { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 },
  algebra: { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 },
  geometry: { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 },
  modernMath: { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 },
  dataSufficiency: { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 }
};

/**
 * Process a student's answer submission and update the topic's skill matrix state.
 */
export function evaluateAdaptiveStep(currentMatrix, topicKey, isCorrect) {
  const matrix = JSON.parse(JSON.stringify(currentMatrix || INITIAL_SKILL_MATRIX));
  const topicState = matrix[topicKey] || { level: 1, accuracy: 0, consecutiveCorrect: 0, totalSolved: 0, correctCount: 0 };

  topicState.totalSolved = (topicState.totalSolved || 0) + 1;

  if (isCorrect) {
    topicState.correctCount = (topicState.correctCount || 0) + 1;
    topicState.consecutiveCorrect = (topicState.consecutiveCorrect || 0) + 1;

    // Rule: 2 consecutive correct answers -> Increase level by +1 (max 5)
    if (topicState.consecutiveCorrect >= 2) {
      if (topicState.level < 5) {
        topicState.level += 1;
      }
      topicState.consecutiveCorrect = 0; // reset streak after level up
    }
  } else {
    topicState.consecutiveCorrect = 0; // reset streak on error
    // Rule: 1 incorrect answer -> Drop difficulty (-1, min 1)
    if (topicState.level > 1) {
      topicState.level -= 1;
    }
  }

  // Recalculate topic accuracy percentage
  topicState.accuracy = Math.round((topicState.correctCount / topicState.totalSolved) * 100);

  matrix[topicKey] = topicState;
  return {
    updatedMatrix: matrix,
    newLevel: topicState.level,
    accuracy: topicState.accuracy,
    leveledUp: isCorrect && topicState.consecutiveCorrect === 0 && topicState.totalSolved > 1,
    leveledDown: !isCorrect && topicState.level > 1
  };
}

/**
 * Calculates overall accuracy across all topics
 */
export function calculateOverallStats(matrix) {
  const topics = Object.values(matrix || {});
  if (!topics.length) return { overallAccuracy: 0, totalSolved: 0, averageLevel: 1 };

  let totalSolved = 0;
  let totalCorrect = 0;
  let sumLevels = 0;

  topics.forEach((t) => {
    totalSolved += t.totalSolved || 0;
    totalCorrect += t.correctCount || 0;
    sumLevels += t.level || 1;
  });

  const overallAccuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
  const averageLevel = (sumLevels / topics.length).toFixed(1);

  return {
    overallAccuracy,
    totalSolved,
    averageLevel
  };
}

/**
 * Returns a human-readable difficulty label
 */
export function getDifficultyLabel(level) {
  switch (level) {
    case 1: return 'Level 1: Foundational';
    case 2: return 'Level 2: Intermediate';
    case 3: return 'Level 3: CAT / GMAT 600+';
    case 4: return 'Level 4: Hard / GMAT 680+';
    case 5: return 'Level 5: Elite / GMAT 700+';
    default: return `Level ${level}`;
  }
}
