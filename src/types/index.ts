import { IconType } from "react-icons/lib";

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
  dateAndTime: DateAndTime;
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

export interface DayTime {
  from: string; // "HH:MM"
  to: string; // "HH:MM"
}

export interface ExamTime {
  date: string; // "YYYY.MM.DD"
  time: string; // "HH:MM-HH:MM"
}

export interface DateAndTime {
  saturday?: DayTime;
  sunday?: DayTime;
  monday?: DayTime;
  tuesday?: DayTime;
  wednesday?: DayTime;
  exam?: ExamTime;
}

export interface plan {
  courses: Eligible[];
  totalUnits: string;
}

export interface TStudentCard {
  id: number;
  name: string;
  entry: number;
  college: string;
  period: string;
  valid: boolean;
}

export interface TSudentInfo {
  id: number;
  name: string;
  entry: number;
  college: string;
  period: string;
  valid: boolean;
  passed_units: number;
  terms: Term[];
}

export type Row = Record<string, any>;
export type DataInput = Row[] | Record<string, Row>;
