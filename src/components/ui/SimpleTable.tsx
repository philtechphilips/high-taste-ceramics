import React from "react";

// Simple Table Component
export function SimpleTable({
  data,
  columns,
  className,
  emptyMessage = "No data available",
  loading = false,
  onRowClick,
  hoverable = true,
  compact = false,
  bordered = true,
}) {
  return (
    <div className="w-full">
      {/* Responsive Table Container */}
      <div
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 sm:overflow-x-visible max-w-full min-w-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <table className="w-full min-w-[300px] max-w-[100vw] border-collapse">
          <thead
            className={
              bordered
                ? "border-b border-gray-200 dark:border-gray-700"
                : undefined
            }
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={[
                    "px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300 whitespace-nowrap",
                    column.width,
                    column.align === "center" ? "text-center" : "",
                    column.align === "right" ? "text-right" : "",
                    compact ? "px-2 py-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={[
              "bg-white dark:bg-gray-900",
              bordered ? "divide-y divide-gray-200 dark:divide-gray-700" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[#4A5568] dark:text-gray-400"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={[
                    // striped && rowIndex % 2 === 1 ? "bg-gray-50 dark:bg-gray-800" : "",
                    hoverable ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "",
                    onRowClick ? "cursor-pointer" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={[
                        "px-4 py-3 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap",
                        column.align === "center" ? "text-center" : "",
                        column.align === "right" ? "text-right" : "",
                        compact ? "px-2 py-2" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {column.render
                        ? column.render(row[column.key], row, rowIndex)
                        : String(row[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export as default
export { SimpleTable as default };
