import React, { useEffect, useState } from "react";
import { PointsGroupsField } from "./PointsGroupsField";
import { Button } from "../../shared/Button";
import { PanelHeader } from "../PanelHeader";

interface Props {
  isVisible: boolean;
  pointsGroupsString: string;
  closePanel: () => void;
  handleAddingPointsGroupsData: (pointGroupsString: string) => void;
}

export function PointsGroups(props: Props) {
  function togglePanel() {
    const panel = document.querySelector("#point-groups-panel");
    if (props.isVisible) {
      panel?.classList.remove("-translate-x-full");
      panel?.classList.add("z-50")
    } else {
      panel?.classList.add("-translate-x-full")
      setTimeout(() => panel?.classList.remove("z-50"), 500);
      props.closePanel();
    }
  }

  useEffect((): void => {
    togglePanel();
  }, [props.isVisible])

  return (
    <aside 
      className="box-border fixed flex flex-col bg-white h-screen w-1/3 min-w-[400px] top-0 left-0 p-4 border-r border-r-4 border-r-solid border-r-teal-700 -translate-x-full transition-all duration-500 ease-in"
      id="point-groups-panel"
    >
      <PanelHeader headerText="Dej punkty!" handleClosePanel={props.closePanel}/>
      <PointsGroupsField value={props.pointsGroupsString} handleFieldChange={props.handleAddingPointsGroupsData}/>
    </aside>
  )
}