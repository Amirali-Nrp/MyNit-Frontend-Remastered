import { SideBarState, StudentState } from "@/types";
import { create } from "zustand";

export const useStudentStorage = create<StudentState>((set) => ({
  studentId: null,
  setStudentId: (Id) => set(() => ({ studentId: Id })),
}));

export const useSidebarStorage = create<SideBarState>((set) => ({
  isCollapsible: false,
  toggleCollapse: true,
  setIsCollapsible: (isCollapsible) => set(() => ({ isCollapsible })),
  setToggleCollapse: (toggleCollapse) => set(() => ({ toggleCollapse })),
}));
