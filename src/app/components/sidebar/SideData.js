import React from "react"
import {} from "react-icons"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { MdEngineering } from "react-icons/md";
import { SlChemistry } from "react-icons/sl";

export const SidebarData = [
  // {
  //   title: "Engineering 102",
  //   path: "/",
  //   icon: <MdEngineering />,
  //   cName: "nav-text",
  //   categories: [
  //     {
  //       title: "function",
  //       path: "/function",
  //       progress: "90",
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: "nav-text",
  //     },
  //     {
  //       title: "Lambda",
  //       progress: "15",
  //       path: "/Lambda",
  //       icon: <FaIcons.FaCartPlus />,
  //       cName: "nav-text",
  //     },
  //   ]
  // },
  {
    title: "Python Basics",
    path: "/team",
    icon: <SlChemistry />,
    cName: "nav-text",
    categories: [
      {
      title: "Functions ✅",
      path: "/functions",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
      progress_yes: "true",
    },
      {
      title: "Loops 🫤",
      path: "/loops",
      progress: "20",
      icon: <IoIcons.IoMdHelpCircle />,
      cName: "nav-text",
    },
    {
      title: "Data Types 💪",
      path: "/data-types",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    },
    {
      title: "If Statements 💩",
      path: "/if-statements",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    },
    ]
  },
  
];