import { MenuItem } from "@/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendar3Week } from "react-icons/bs";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { FaUniversity } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { GrCheckboxSelected } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { TiDocumentAdd } from "react-icons/ti";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "صفحه اصلی",
    href: "/dashboard",
    icon: AiOutlineHome,
  },
  {
    id: 2,
    name: "ترم های گذشته و جاری",
    href: "/terms",
    icon: CiViewTable,
  },

  {
    id: 3,
    name: "چارت پیشنهادی دانشکده",
    href: "/SuggestedUniversityChart",
    icon: FaUniversity,
  },
  {
    id: 4,
    name: "چارت پیشنهادی هوشمند",
    href: "/SuggestedSystemChart",
    icon: LuBrainCircuit,
  },
  {
    id: 5,

    name: "پیش ثبت نام",
    href: "/weeklyPlanner",
    icon: GrCheckboxSelected,
  },
  {
    id: 6,
    name: "پیشنهاد برنامه هفتگی",
    href: "/SuggestWeeklyPlans",
    icon: BsCalendar3Week,
  },
  {
    id: 7,
    name: "افزودن اطلاعات",
    href: "/AddCourses",
    icon: TiDocumentAdd,
  },
  {
    id: 8,
    name: "آرشیو آموزشی",
    href: "https://nitacademy.ir/",
    icon: PiFilmReel,
  },
  //   {
  //     id: 9,
  //     name: "رزرو غذا",
  //     href: "https://food.nit.ac.ir",
  //     icon: GiMeal,
  //   },
];
