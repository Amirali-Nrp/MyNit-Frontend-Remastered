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
