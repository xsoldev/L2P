/**
 * Calculate the total score based on lesson points
 */
export function calculateTotalScore(lessonScores: number[]): number {
  return lessonScores.reduce((sum, score) => sum + score, 0);
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Determine achievement level based on score
 */
export function getAchievementLevel(score: number): 'bronze' | 'silver' | 'gold' | 'platinum' {
  if (score >= 200) return 'platinum';
  if (score >= 150) return 'gold';
  if (score >= 100) return 'silver';
  return 'bronze';
}

/**
 * Calculate average score
 */
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
}

/**
 * Check if score is passing
 */
export function isPassingScore(score: number, passingThreshold: number = 70): boolean {
  return score >= passingThreshold;
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}

/**
 * Calculate bonus points based on completion time
 */
export function calculateTimeBonus(completionTimeMinutes: number, targetTimeMinutes: number): number {
  if (completionTimeMinutes <= 0) return 0;
  if (completionTimeMinutes <= targetTimeMinutes * 0.8) return 50;
  if (completionTimeMinutes <= targetTimeMinutes) return 25;
  return 0;
}
