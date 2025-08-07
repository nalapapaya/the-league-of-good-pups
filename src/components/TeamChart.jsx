"use client";
ChartJS.defaults.backgroundColor = "#fff";

ChartJS.register({
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff"; // white background
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
});

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const groupRating = {
  Working: 25,
  Herding: 22,
  Hound: 22,
  Sporting: 20,
  Terrier: 18,
  NonSporting: 18,
  Toy: 15,
  "Not available": 0,
};

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
  "lapdog",
];

function getSpecialtyScore(bred_for) {
  if (!bred_for) return 0;
  const lower = bred_for.toLowerCase();
  const isLegit = approvedBredFor.some((word) => lower.includes(word));
  return isLegit ? 20 : 0; //if approved, get 20 points
}

export default function TeamChart({ team }) {
  if (!team || team.length === 0) return null;

  // Calculate stats
  let bitePower = 0,
    obedience = 0,
    rarity = 0,
    speciality = 0,
    group = 0;

  team.forEach((dog) => {
    const tempCount = dog.temperament?.split(",").length || 1;
    const originCount = dog.origin?.split(",").length || 1;
    const rawGroup = dog.breed_group || "Not available"; //for values "Not available" to prevent undefined
    const groupScore = groupRating[rawGroup] || 0;
    const weight = parseFloat(dog.weight) || 0;

    bitePower += (weight * 3) / 5 || 0;
    obedience += tempCount * 5;
    rarity += originCount * 10;
    speciality += getSpecialtyScore(dog.bred_for);
    group += groupScore;
  });

  //decreasing synergy per dog added (recommended 5 dog in team)
  const synergy = Math.max(0, 100 - (team.length - 1) * 20);

  const data = {
    labels: [
      "Synergy",
      "Bite Power",
      "Obedience",
      "Rarity",
      "Speciality",
      "Group",
    ],
    datasets: [
      {
        label: "Team Radar",
        data: [synergy, bitePower, obedience, rarity, speciality, group],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    plugins: {
      background: {
        color: "#ffffff",
      },
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: "transparent",
          color: "#666",
        },
        pointLabels: {
          font: { size: 14 },
          color: "#444",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "50px auto",
        marginTop: "130px",
        padding: "20px",
        backgroundColor: "#fff",
        border: "2px solid black",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Radar data={data} options={options} />
    </div>
  );
}
