import React from "react";

interface SEOIssueCardProps {
  title: string;
  subtitle: string;
  description: string;
  recommendations?: string[];
  impact: string;
  effort: string;
  pagesAffected: string;
  iconColor?: string;
  borderColor?: string;
  impactColor?: string;
  buttonColor?: string;
  icon?: React.ReactNode;
}

const SEOIssueCard: React.FC<SEOIssueCardProps> = ({
  title,
  subtitle,
  description,
  recommendations,
  impact,
  effort,
  pagesAffected,
  iconColor = "#4984FF",
  borderColor = "#EF4444",
  impactColor = "#DC2626",
  buttonColor = "#EBF2FF",
  icon,
}) => {
  return (
    <div className="p-4 sm:p-6 border-b border-[#E5E7EB]">
      <div className="flex flex-col lg:flex-row items-start w-full justify-between gap-4">
        <div className="flex-col gap-3 sm:gap-4 w-full lg:w-3/4">
          <div className="flex items-start gap-3">
            {icon ? (
              <div className="flex-shrink-0 mt-1">{icon}</div>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mt-1"
              >
                <rect width="32" height="32" rx="16" fill="#FEE2E2" />
                <path
                  d="M20.5898 14.9297C21.1094 15.4492 21.1094 16.2969 20.5898 16.7891L15.0117 22.3672C14.5195 22.8867 13.6719 22.8867 13.1523 22.3672L7.38281 16.5977C7.13672 16.3516 7 16.0234 7 15.668V10.0625C7 9.35156 7.57422 8.75 8.3125 8.75H13.8906C14.2461 8.75 14.5742 8.91406 14.8203 9.16016L20.5898 14.9297ZM10.0625 13.125C10.7734 13.125 11.375 12.5508 11.375 11.8125C11.375 11.1016 10.7734 10.5 10.0625 10.5C9.32422 10.5 8.75 11.1016 8.75 11.8125C8.75 12.5508 9.32422 13.125 10.0625 13.125ZM24.0898 16.7891L18.5117 22.3672C18.0195 22.8867 17.1719 22.8867 16.6523 22.3672L21.4102 17.6094C21.875 17.1445 22.1484 16.5156 22.1484 15.8594C22.1484 15.2031 21.875 14.6016 21.4102 14.1367L16.0508 8.75H17.3906C17.7461 8.75 18.0742 8.91406 18.3203 9.16016L24.0898 14.9297C24.6094 15.4492 24.6094 16.2969 24.0898 16.7891Z"
                  fill={iconColor}
                />
              </svg>
            )}
            <div className="flex-1 min-w-0">
              <h6 className="text-[#1A202C] text-sm sm:text-base font-medium">
                {title}
              </h6>
              <p className="text-[#718096] text-xs sm:text-sm">{subtitle}</p>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs sm:text-sm text-[#4A5568] my-3 sm:my-4">
              {description}
            </p>

            {recommendations && recommendations.length > 0 && (
              <div
                className="bg-[#F9FAFB] p-3 sm:p-4 border-l-4"
                style={{ borderLeftColor: borderColor }}
              >
                <h6 className="text-[#1A202C] text-xs sm:text-sm font-medium mb-2">
                  Recommendation:
                </h6>
                <ul className="list-disc pl-4 flex flex-col gap-1 text-xs sm:text-sm text-[#4A5568]">
                  {recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm" style={{ color: impactColor }}>
                Impact: {impact}
              </p>
              <p className="text-xs sm:text-sm text-[#718096]">
                Effort: {effort}
              </p>
              <p className="text-xs sm:text-sm text-[#718096]">
                Pages affected: {pagesAffected}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-1/4 justify-start lg:justify-end mt-4 lg:mt-0">
          <button
            className="text-xs sm:text-sm rounded-6 py-1.5 px-3 rounded-md whitespace-nowrap"
            style={{ backgroundColor: buttonColor, color: iconColor }}
          >
            View Pages
          </button>
          <button className="bg-[#F3F4F6] text-[#4A5568] text-xs sm:text-sm rounded-6 py-1.5 px-3 rounded-md whitespace-nowrap">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEOIssueCard;
