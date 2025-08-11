import { Eligible, plan, SideBarState } from "@/types";
import { create } from "zustand";

export const useSidebarStorage = create<SideBarState>((set) => ({
  isCollapsible: false,
  toggleCollapse: true,
  setIsCollapsible: (isCollapsible) => set(() => ({ isCollapsible })),
  setToggleCollapse: (toggleCollapse) => set(() => ({ toggleCollapse })),
}));

export const useWeeklyPlanStorage = create<{
  selected: Record<string, Eligible>;
  setSelected: (
    selected:
      | Record<string, Eligible>
      | ((prev: Record<string, Eligible>) => Record<string, Eligible>)
  ) => void;
}>((set) => ({
  selected: {},
  setSelected: (selected) =>
    set((state) => ({
      selected:
        typeof selected === "function" ? selected(state.selected) : selected,
    })),
}));

export const usePlansStorage = create<{
  plans: plan[];
  setPlans: (plans: plan[] | ((prev: plan[]) => plan[])) => void;
}>((set) => ({
  plans: [],
  setPlans: (plans) =>
    set((state) => ({
      plans: typeof plans === "function" ? plans(state.plans) : plans,
    })),
}));

export const usePlanNumStorage = create<{
  planNum: number;
  setPlanNum: (planNum: number | ((prev: number) => number)) => void;
}>((set) => ({
  planNum: 0,
  setPlanNum: (planNum) =>
    set((state) => ({
      planNum: typeof planNum === "function" ? planNum(state.planNum) : planNum,
    })),
}));
