export type ROIComparison = {
  date: string
  estimatedROI: number
  actualROI: number
  accuracy: number
}

export function calculateAccuracy(estimated: number, actual: number): number {
  return Math.max(0, 100 - Math.abs(estimated - actual))
}

export function shouldRefine(comparisons: ROIComparison[]): boolean {
  if (comparisons.length < 3) return false
  const avgAccuracy =
    comparisons.reduce((sum, c) => sum + c.accuracy, 0) / comparisons.length
  return avgAccuracy < 70
}

export function getAdjustedWeights(
  comparisons: ROIComparison[]
): { rentability: number; trend: number; competition: number; seasonality: number; history: number } {
  const avgAccuracy =
    comparisons.reduce((sum, c) => sum + c.accuracy, 0) / comparisons.length

  if (avgAccuracy >= 70) {
    return { rentability: 0.35, trend: 0.25, competition: 0.2, seasonality: 0.1, history: 0.1 }
  }

  return { rentability: 0.3, trend: 0.2, competition: 0.2, seasonality: 0.15, history: 0.15 }
}
