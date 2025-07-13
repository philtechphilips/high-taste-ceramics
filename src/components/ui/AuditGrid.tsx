import React from "react";
import Link from "next/link";
import { WebsiteLinkIcon } from "../icons";

type Audit = {
  id: number;
  website: string;
  websiteTitle: string;
  date: string;
  time: string;
  score: string;
  status: "completed" | "pending" | "failed" | "In Progress";
  criticalIssues: number;
  warnings: number;
};

interface AuditGridProps {
  data: Audit[];
}

const AuditGrid: React.FC<AuditGridProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#DCFCE7] text-[#166534]";
      case "pending":
        return "bg-[#EAB308]";
      case "failed":
        return "bg-[#EF4444]";
      case "In Progress":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      default:
        return "bg-gray-500";
    }
  };

  const getScoreColor = (score: string) => {
    const scoreNum = parseInt(score.replace(/[^0-9]/g, ""));
    if (scoreNum < 60) return "bg-[#EF4444]";
    if (scoreNum < 80) return "bg-[#EAB308]";
    return "bg-[#22C55E]";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((audit) => {
        return (
          <div
            key={audit.id}
            className="bg-white shadow-xs dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center gap-3  px-4 pt-4">
              <div>
                <WebsiteLinkIcon />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0">
                <h3 className="text-gray-900 text-[15px] dark:text-white truncate">
                  {audit.website}
                </h3>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    audit.status,
                  )}`}
                >
                  {audit.status.charAt(0).toUpperCase() + audit.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Status and Score */}
            <div className="flex flex-col w-full gap-2 px-4 pt-4">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-[#374151] dark:text-white">Score</p>
                <p className="text-sm text-[#374151] dark:text-gray-400">
                  {audit.score}/100
                </p>
              </div>
              <div className="flex w-full items-center gap-2">
                <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-2 rounded ${getScoreColor(
                      audit.score,
                    )}`}
                    style={{
                      width: `${Math.min(
                        parseInt(audit.score.replace(/[^0-9]/g, "")),
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Issues */}
            <div className="flex gap-2 mb-2 px-4 pt-4">
              <span
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
              >
                {audit.criticalIssues} Critical
              </span>
              <span
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: "#FEF9C3", color: "#854D0E" }}
              >
                {audit.warnings} Warnings
              </span>
            </div>

            {/* Date and Time */}
            <div className="mb-4 mt-3 px-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last audited: May 24, 2023
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t bg-gray-50 rounded-b-xl border-gray-200 dark:border-gray-700 px-4 pt-2 pb-2">
              <Link
                href={`/audits/${audit.id}`}
                className="text-primary-400 text-sm font-medium"
              >
                View Details
              </Link>

              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ml-auto">
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4C1.46957 4 0.96086 3.78929 0.585787 3.41421C0.210714 3.03914 0 2.53043 0 2C0 1.46957 0.210714 0.960859 0.585787 0.585786C0.96086 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585786C3.78929 0.960859 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4ZM2 10C1.46957 10 0.96086 9.78929 0.585787 9.41421C0.210714 9.03914 0 8.53043 0 8C0 7.46957 0.210714 6.96086 0.585787 6.58579C0.96086 6.21071 1.46957 6 2 6C2.53043 6 3.03914 6.21071 3.41421 6.58579C3.78929 6.96086 4 7.46957 4 8C4 8.53043 3.78929 9.03914 3.41421 9.41421C3.03914 9.78929 2.53043 10 2 10ZM2 16C1.46957 16 0.96086 15.7893 0.585787 15.4142C0.210714 15.0391 0 14.5304 0 14C0 13.4696 0.210714 12.9609 0.585787 12.5858C0.96086 12.2107 1.46957 12 2 12C2.53043 12 3.03914 12.2107 3.41421 12.5858C3.78929 12.9609 4 13.4696 4 14C4 14.5304 3.78929 15.0391 3.41421 15.4142C3.03914 15.7893 2.53043 16 2 16Z"
                    fill="#6B7280"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuditGrid;
