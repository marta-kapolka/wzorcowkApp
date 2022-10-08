import React, { useEffect, useState } from "react";
import { getPointsGroupsFromText } from "../domain/get-point-groups-from-string";
import { CourseName } from "../domain/enums";
import { Card } from "./Card";
import { PointsGroups } from "./PointsGroups";

const POINTS_GROUPS: number[][] = [];

export function App() {
  const [ pointsGroupsString, setPointsGroupsString ] = useState(setInitialPointsGroupsString);
  const [ pointsGroups, setPointsGroups ] = useState(POINTS_GROUPS);

  function handleAddingPointsGroupsData(pointsGroupsString: string): void {
    setPointsGroupsString(pointsGroupsString);
  }

  function setInitialPointsGroupsString(): string {
    const localStorageSavedPointsGroupsString = localStorage.getItem("wzorcowkAppPointsGroupsString");
    return localStorageSavedPointsGroupsString || "";
  }

  useEffect((): void => {
    const pointsData = getPointsGroupsFromText(pointsGroupsString);
    setPointsGroups(pointsData);
    localStorage.setItem("wzorcowkAppPointsGroupsString", pointsGroupsString);
  },
  [ pointsGroupsString ])

  return (
    <div className="relative">
      <div className="flex flex-col p-10">
        {/* <div className="flex justify-center">
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={saveData}>Zapisz i nie zgub!</button>
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={getData}>Oddaj zapisane!</button>
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={downloadData}>Dej mnie na dysk!</button>
        </div> */}
        <Card
          pointsGroups={pointsGroups}
          pointsAmount={24}
          courseName={CourseName.TZ}
          baseTimeLimit={150}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointsGroups}
          pointsAmount={20}
          courseName={CourseName.TU}
          baseTimeLimit={130}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointsGroups}
          pointsAmount={16}
          courseName={CourseName.TT}
          baseTimeLimit={130}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointsGroups}
          pointsAmount={15}
          courseName={CourseName.TP_TD}
          baseTimeLimit={135}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointsGroups}
          pointsAmount={11}
          courseName={CourseName.TN}
          baseTimeLimit={110}
          additionalTimeLimit={35}
        ></Card>
      </div>
      <PointsGroups pointsGroupsString={pointsGroupsString} handleAddingPointsGroupsData={handleAddingPointsGroupsData} />
    </div>
  )
}