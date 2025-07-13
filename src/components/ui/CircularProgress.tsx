import React from "react";

const getColorByScore = (score: number) => {
  if (score >= 81) return "#10B981"; // Green for excellent (81-100)
  if (score >= 61) return "#F59E0B"; // Orange for good (61-80)
  if (score >= 31) return "#F59E0B"; // Yellow for fair (31-60)
  return "#EF4444"; // Red for poor (0-30)
};

const Progress = ({ value = 67, max = 100, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  const progressColor = getColorByScore(value);

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle (gray) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle (dynamic color based on score) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500">/ {max}</span>
        </div>
      </div>
    </div>
  );
};

// Example usage with different values
const CircularProgress = ({ score = 67 }: { score?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-8">
        <Progress value={score} max={100} />
      </div>
    </div>
  );
};

export default CircularProgress;
