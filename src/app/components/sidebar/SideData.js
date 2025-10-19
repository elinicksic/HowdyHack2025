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
    title: "Chemistry",
    path: "/team",
    icon: <SlChemistry />,
    cName: "nav-text",
    categories: [
      {
      title: "Stichiometry ✅",
      path: "/stichiometry",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
      progress_yes: "true",
    },
      {
      title: "Ideal gases 🫤",
      path: "/ideal gases",
      progress: "20",
      icon: <IoIcons.IoMdHelpCircle />,
      cName: "nav-text",
    },
    {
      title: "Reactions 💪",
      path: "/Reactions",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    },
    {
      title: "Oxidation 💩",
      path: "/oxidation",
      progress: "40",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    },
    ]
  },
  
];