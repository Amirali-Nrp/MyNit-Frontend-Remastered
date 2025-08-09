// components/Chart/ChartTable.tsx
import React from "react";

import { CheckCircle, XCircle } from "lucide-react";

export interface CourseRow {
  id: string;
  name: string;
  units: number;
  pre_reqs: string;
  co_reqs?: string; // joined IDs like "123, 456"
  passed: string; // "passed" means true
  mark?: string; // course grade
  isRemaining: boolean;
}

export interface ChartTableProps {
  semester: number;
  courses: CourseRow[];
  totalUnits: number;
  totalPassedUnits: number;
  totalGrade: number | string;
  /** If true, hide grade & status columns/cards (for remaining courses view). */
  isRemaining?: boolean;
}

const ChartTable: React.FC<ChartTableProps> = ({
  semester,
  courses,
  totalUnits,
  totalPassedUnits,
  totalGrade,
  isRemaining = false,
}) => {
  const showAssessments = !isRemaining; // show grade/status when not remaining
  const formattedTotalGrade =
    totalGrade !== undefined &&
    totalGrade !== null &&
    !Number.isNaN(Number(totalGrade))
      ? Number(totalGrade).toFixed(2)
      : "-";

  return (
    <div className="min-h-[300px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 py-3 text-center text-lg font-semibold text-black">
        ترم {semester}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto sm:block">
        <table dir="rtl" className="min-w-full text-right text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-black">کد درس</th>
              <th className="px-4 py-3 text-black">نام درس</th>
              <th className="px-4 py-3 text-black">واحد</th>
              <th className="px-4 py-3 text-black">پیش‌نیاز (هم‌نیاز)</th>
              {showAssessments && (
                <>
                  <th className="px-4 py-3 text-black">نمره</th>
                  <th className="px-4 py-3 text-black last:pr-6">وضعیت</th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-500">
            {courses.map((row, idx) => (
              <tr
                key={row.id + idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3">{row.id}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.units}</td>
                <td className="px-4 py-3">
                  {row.pre_reqs || "-"}
                  {row.co_reqs ? ` (${row.co_reqs})` : ""}
                </td>
                {showAssessments && (
                  <>
                    <td className="px-4 py-3">{row.mark ?? "-"}</td>
                    <td className="flex justify-center px-4 py-3">
                      {row.passed === "passed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>

          {/* Totals FOOTER — single row; values inline with labels */}
          <tfoot>
            <tr className="bg-gray-100">
              {/* under: کد درس */}
              <td className="px-4 py-3"></td>
              {/* under: نام درس */}
              <td className="px-4 py-3"></td>
              {/* under: واحد → show total + passed units inline */}
              <td className="px-4 py-3">
                <span className="font-semibold text-black">
                  جمع واحد:{" "}
                  <span className="font-normal text-gray-600">
                    {totalUnits}
                  </span>
                </span>
              </td>
              {/* under: پیش‌نیاز (هم‌نیاز) */}
              {showAssessments && totalPassedUnits && (
                <>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-black">
                      گذرانده:{" "}
                      <span className="font-normal text-gray-600">
                        {totalPassedUnits}
                      </span>
                    </span>
                  </td>
                </>
              )}

              {showAssessments && (
                <>
                  {/* under: نمره → show total grade rounded */}
                  <td className="px-4 py-3">
                    <span className="font-semibold text-black">
                      معدل:{" "}
                      <span className="font-normal text-gray-600">
                        {formattedTotalGrade}
                      </span>
                    </span>
                  </td>
                  {/* under: وضعیت */}
                  <td className="px-4 py-3"></td>
                </>
              )}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block space-y-4 p-4 sm:hidden">
        {courses.map((row, idx) => (
          <div key={row.id + idx} className="rounded-lg bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-base font-semibold text-black">
                {row.name}
              </span>
              {showAssessments &&
                (row.passed === "passed" ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                ))}
            </div>
            <div className="space-y-1 text-sm text-gray-500">
              <div>کد درس: {row.id}</div>
              <div>واحد: {row.units}</div>
              <div>
                پیش‌نیاز: {row.pre_reqs || "-"}
                {row.co_reqs ? ` (${row.co_reqs})` : ""}
              </div>
              {showAssessments && <div>نمره: {row.mark ?? "-"}</div>}
            </div>
          </div>
        ))}

        {/* Mobile Totals (already inline label:value) */}
        <div className="space-y-2 rounded-lg bg-gray-100 p-4">
          <div className="font-semibold text-black">
            جمع واحد:{" "}
            <span className="font-normal text-gray-600">{totalUnits}</span>
          </div>
          {showAssessments && totalPassedUnits && (
            <div className="font-semibold text-black">
              واحدهای گذرانده:{" "}
              <span className="font-normal text-gray-600">
                {totalPassedUnits}
              </span>
            </div>
          )}
          {showAssessments && (
            <div className="font-semibold text-black">
              معدل:{" "}
              <span className="font-normal text-gray-600">
                {formattedTotalGrade}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTable;
