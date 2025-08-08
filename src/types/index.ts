import { IconType } from "react-icons/lib";

export interface StudentState {
  studentId: string | null;
  setStudentId: (student: string | null) => void | any;
}

export type MenuItem = {
  id: number;
  name: string;
  href: string;
  icon: IconType;
};

export interface SideBarState {
  isCollapsible: boolean;
  toggleCollapse: boolean;
  setIsCollapsible: (isCollapsible: boolean) => void;
  setToggleCollapse: (toggleCollapse: boolean) => void;
}

export interface AuthorizeResponse {
  detail: string;
}

export interface Reqs {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  units: number;
  lesson_group: number;
  pre_reqs: Reqs[];
  co_reqs: Reqs[];
  passed: string;
  mark: number;
}
export interface Term {
  term_number: number;
  courses: Course[];
  total_units: number;
  total_passed?: number;
  grade?: number;
}

export interface dateAndTime {
  sunday?: { from: string; to: string };
  saturday?: { from: string; to: string };
  monday?: { from: string; to: string };
  tuesday?: { from: string; to: string };
  wednesday?: { from: string; to: string };
  exam?: { date: string; time: string };
}

export interface Eligible {
  collegeID: string;
  collegeName: string;
  groupID: number;
  groupName: string;
  courseID: string;
  courseName: string;
  totalUnit: number;
  practicalUnit: number;
  capacity: number;
  registeredCount: number;
  waitListCount: number;
  gender: string;
  professor: string;
  dateAndTime: dateAndTime;
  description: string;
}
export interface Student {
  student_id: number;
  name: string;
  passed_units: number;
  terms: Term[];
  remaining_terms: Term[];
  eligibles: Eligible[];
}
