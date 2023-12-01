import React from "react"
import { MenuItem } from "./MenuItem"
import { CourseConfiguration } from "../App";

interface Props {
  isAnyCourseSelected: boolean;
  showPointsGroupsPanel: () => void;
  downloadHandler: () => void;
  showCoursesPanel: () => void;
}

export const HeaderBar = ({isAnyCourseSelected, downloadHandler, showPointsGroupsPanel, showCoursesPanel}: Props): JSX.Element => {
  return (
    <header className="flex justify-between items-center p-2 sticky top-0 bg-white z-20 border-b border-b-solid border-b-teal-700">
      <h1 className="text-2xl pl-4">
        <span className="font-bold">wzorcówk</span>
        <span className="text-teal-700">App</span>
      </h1>
      <menu  className="flex">
        <MenuItem text={"Grupy punktów"} itemHandler={showPointsGroupsPanel} />
        <MenuItem text={"Trasy"} itemHandler={showCoursesPanel} />
        <MenuItem text={"Drukuj wszystkie"} itemHandler={downloadHandler} disabled={!isAnyCourseSelected} />
      </menu>
    </header>
  )
}