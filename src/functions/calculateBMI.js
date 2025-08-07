//calculating optimal BMI for each dog (export function)

//modifying addtoteam stats (resuable function)
export const getAvgFromRange = (value) => {
  if (!value.includes("-")) return parseFloat(value); //return number
  const [low, high] = value.split(" - ").map(Number);
  return String(Math.round((low + high) / 2));
};

// Optimal BMI from original avg stats
export function calOptimalBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  const optimalBMI = weightKg / (heightM * heightM);
  return Math.round(optimalBMI * 10) / 10; // 1dp
}

// Current BMI from user values
export function calBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10; // 1dp
}

// Lifespan adjustment based on BMI deviation
export function calAdjLifespan(optimalBMI, currentBMI, optimalLife) {
  if (!optimalBMI || !currentBMI || !optimalLife) return null;
  const deviationPercent = Math.abs((currentBMI - optimalBMI) / optimalBMI);
  const lifeLoss = deviationPercent * 2; // loses 0.5 years per 5% dev
  const adjustedLife = optimalLife - lifeLoss;
  return adjustedLife.toFixed(1); // 1dp
}
