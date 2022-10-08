import React, {  useState } from "react";
import { PointsGroupsField } from "./PointsGroupsField";

interface Props {
  pointsGroupsString: string;
  handleAddingPointsGroupsData: (pointGroupsString: string) => void;
}

export function PointsGroups(props: Props) {
  const [ isPanelVisible, setIsPanelVisible] = useState(false);

  function togglePanel() {
    const panel = document.querySelector("#point-groups-panel");
    const buttonArrow = document.querySelector("#point-groups-panel-button-arrow")
    if (!isPanelVisible) {
      panel?.classList.remove("-translate-x-full");
      buttonArrow?.classList.add("rotate-180")
      setIsPanelVisible(true)
    } else {
      panel?.classList.add("-translate-x-full")
      buttonArrow?.classList.remove("rotate-180")
      setIsPanelVisible(false)
    }
  }

  return (
    <aside 
      className="box-border fixed flex flex-col bg-white h-screen w-1/3 z-10 top-0 left-0 p-6 border-r border-r-4 border-r-solid border-r-teal-700 -translate-x-full transition-all duration-500 ease-in"
      id="point-groups-panel"
    >
      <PointsGroupsField value={props.pointsGroupsString} handleFieldChange={props.handleAddingPointsGroupsData}/>
      <button 
        className="absolute top-4 -right-1 translate-x-10 bg-teal-700 rounded-tr-xl rounded-br-xl h-12 w-10 z-20"
        onClick={togglePanel}
      >
        <svg
          className="w-6 h-8 ml-2"
          id="point-groups-panel-button-arrow"
          fill="none"
          stroke="white"
          viewBox="0 0 8 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M 2,2
              L 6,6
              L 2,10"
          />
        </svg>
      </button>
    </aside>
  )
}