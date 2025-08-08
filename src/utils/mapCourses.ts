// /utils/mapCourses.ts
import { Course, Reqs } from "@/types";

import { CourseRow } from "@/components/Chart/ChartTable";

export function mapCoursesToRows(courses: Course[]): CourseRow[] {
  return courses.map((c) => ({
    id: c.id.toString(),
    name: c.name,
    units: c.units,
    pre_reqs: c.pre_reqs.map((pr: Reqs) => pr.id.toString()).join(", "),
    co_reqs: c.co_reqs.map((cr: Reqs) => cr.id.toString()).join(", "),
    passed: c.passed,
    mark: c.mark?.toString(),
    isRemaining: false,
  }));
}
