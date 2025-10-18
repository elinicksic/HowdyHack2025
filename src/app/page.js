import React from "react";


import Home from "./hero";
import PopUp from "./components/SideBar";

export default function Page() {
  return(
    <>
    <div className="container1">
        <div style={{position: 'relative'}}>
        <PopUp/>
        <Home/>
        </div>
      </div>
    </>
  )
}