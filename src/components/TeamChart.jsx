"use client"

import React from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js"
import { Radar } from "react-chartjs-2"
// import { weightToPower } from "../functions/weightToPower"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const groupRating = {
  Working: 25,
  Herding: 22,
  Hound: 22,
  Sporting: 20,
  Terrier: 18,
  NonSporting: 18,
  Toy: 15
}

const approvedBredFor = [
  "hunting",
  "herding",
  "guarding",
  "retrieving",
  "coursing",
  "tracking",
  "pulling",
  "driving",
  "flushing",
  "ratting",
  "watchdog",
  "search",
  "lapdog"
]

function getSpecialtyScore(bred_for) {
  if (!bred_for) return 0;
  const lower = bred_for.toLowerCase();
  const isLegit = approvedBredFor.some((word) =>
    lower.includes(word)
  );
  return isLegit ? 20 : 0; //if approved, get 20 points
}

export default function TeamChart({ team }) {
  if (!team || team.length === 0) return null

  // Calculate stats
  let bitePower = 0,
    obedience = 0,
    rarity = 0,
    speciality = 0,
    group = 0

  team.forEach((dog) => {
    const tempCount = dog.temperament?.split(",").length || 1
    const originCount = dog.origin?.split(",").length || 1
    const groupScore = groupRating[dog.breed_group]
    const weight = parseFloat(dog.weight) || 0

    bitePower += weight *3/5 || 0
    obedience += tempCount*5
    rarity += originCount * 10
    speciality += getSpecialtyScore(dog.bred_for);
    group += groupScore
  })

  //decreasing synergy per dog added (recommended 5 dog in team)
  const synergy = Math.max(0, 100 - (team.length - 1) * 20)

  const data = {
    labels: [
      "Synergy",
      "Bite Power",
      "Obedience",
      "Rarity",
      "Speciality",
      "Group"
    ],
    datasets: [
      {
        label: "Team Radar",
        data: [
          synergy,
          bitePower,
          obedience,
          rarity,
          speciality,
          group
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)"
      }
    ]
  }

  const options = {
    elements: {
      line: {
        borderWidth: 3
      }
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: "transparent",
          color: "#666"
        },
        pointLabels: {
          font: { size: 14 },
          color: "#444"
        }
      }
    }
  }

  return (
    <div style={{ Width: "400px", margin: "0 auto", marginTop: "50px" }}>
      <Radar data={data} options={options} />
    </div>
  )
}
