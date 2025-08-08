// components/ChartTable.tsx
import React from "react";

import { CheckCircle, XCircle } from "lucide-react";

export interface CourseRow {
  id: string;
  name: string;
  units: number;
  pre_reqs: string;
  co_reqs?: string;
  passed: string;
  mark?: string;
  isRemaining: boolean;
}

export interface ChartTableProps {
  semester: number;
  courses: CourseRow[];
  totalUnits: number;
  totalPassedUnits: number;
  totalGrade: number | string;
}

const ChartTable: React.FC<ChartTableProps> = ({
  semester,
  courses,
  totalUnits,
  totalPassedUnits,
  totalGrade,
}) => {
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
              <th className="px-4 py-3 text-black">کد درس</th>
              <th className="px-4 py-3 text-black">نام درس</th>
              <th className="px-4 py-3 text-black">واحد</th>
              <th className="px-4 py-3 text-black">پیش‌نیاز (هم‌نیاز)</th>
              <th className="px-4 py-3 text-black last:pr-6">وضعیت</th>
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
                  {row.pre_reqs}
                  {row.co_reqs && `, ${row.co_reqs}`}
                </td>
                <td className="flex justify-center px-4 py-3">
                  {row.passed === "passed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td></td>
              <td></td>
              <td className="px-4 py-1 font-semibold text-black">جمع واحد</td>
              <td className="px-4 py-1 font-semibold text-black">
                واحدهای گذرانده
              </td>
              <td className="px-4 py-1 font-semibold text-black">معدل</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-gray-500">{totalUnits}</td>
              <td className="px-4 py-3 text-gray-500">{totalPassedUnits}</td>
              <td className="flex justify-center px-4 py-3 text-gray-500 last:rounded-br-2xl">
                {totalGrade}
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
              {row.passed === "passed" ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-500">
              <div>کد درس: {row.id}</div>
              <div>واحد: {row.units}</div>
              {row.pre_reqs && <div>پیش‌نیاز: {row.pre_reqs}</div>}
              {row.co_reqs && <div>هم‌نیاز: {row.co_reqs}</div>}
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
