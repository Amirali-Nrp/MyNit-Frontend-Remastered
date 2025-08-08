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
  const colCount = 4 + (showAssessments ? 2 : 0);

  return (
    <div className="min-h-[300px] overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 py-3 text-center text-lg font-semibold text-black">
        ترم {semester}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto sm:block">
        <table dir="rtl" className="min-w-full text-right text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-black first:rounded-tl-2xl last:rounded-tr-2xl">
                کد درس
              </th>
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

          {/* Totals Footer (responsive to dynamic column count) */}
          <tfoot>
            <tr>
              <td colSpan={colCount} className="bg-gray-100">
                <div className="grid grid-cols-3 gap-4 px-4 py-3">
                  <div>
                    <div className="font-semibold text-black">جمع واحد</div>
                    <div className="text-gray-500">{totalUnits}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-black">
                      واحدهای گذرانده
                    </div>
                    <div className="text-gray-500">{totalPassedUnits}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-black">معدل</div>
                    <div className="text-gray-500">{totalGrade}</div>
                  </div>
                </div>
              </td>
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

        {/* Mobile Totals */}
        <div className="space-y-2 rounded-lg bg-gray-100 p-4">
          <div className="font-semibold text-black">جمع واحد: {totalUnits}</div>
          <div className="font-semibold text-black">
            واحدهای گذرانده: {totalPassedUnits}
          </div>
          <div className="font-semibold text-black">معدل: {totalGrade}</div>
        </div>
      </div>
    </div>
  );
};

export default ChartTable;
