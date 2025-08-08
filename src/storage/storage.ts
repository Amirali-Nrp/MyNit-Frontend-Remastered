import { SideBarState } from "@/types";
import { create } from "zustand";

export const useSidebarStorage = create<SideBarState>((set) => ({
  isCollapsible: false,
  toggleCollapse: true,
  setIsCollapsible: (isCollapsible) => set(() => ({ isCollapsible })),
  setToggleCollapse: (toggleCollapse) => set(() => ({ toggleCollapse })),
}));
