import { getAvgFromRange, calBMI, calOptimalBMI } from "./calculateBMI"

export function getLifespanScore(dog) {
  const height = getAvgFromRange(dog.height)
  const weight = getAvgFromRange(dog.weight)
  const currBMI = calBMI(height, weight)
  const optimalBMI = calOptimalBMI(height, weight)

  let optimalLife = 0 
  if (dog.life_span) {
    if (dog.life_span.includes(" - ")) {
      const [low , high] = dog.life_span.split(" - ").map(Number)
      optimalLife = high 
      console.log("Dog:", dog.name, "| life_span:", dog.life_span, "| optimalLife:", optimalLife)
    } else {
      optimalLife = parseFloat(dog.life_span)
      console.log("Dog:", dog.name, "| life_span:", dog.life_span, "| optimalLife:", optimalLife)
    }
  }

  const deviation = Math.abs(currBMI - optimalBMI) / optimalBMI
  const penalty = deviation * 100
  const score = Math.max(0, 100 - penalty)

  return Math.round(score)
}
