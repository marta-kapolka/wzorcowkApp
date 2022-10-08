import React, { useEffect, useState } from "react";
import { getPointGroupsFromText } from "../domain/get-point-groups-from-string";
import { CourseName } from "../domain/enums";
import { Card } from "./Card";
import { PointGroups } from "./PointGroups";

const POINTS_GROUPS: number[][] = [];

export function App() {
  const [ pointGroups, setPointGroups ] = useState(POINTS_GROUPS);

  function handleAddingPointGroupsData(pointGroupsString: string) {
    const pointsData = getPointGroupsFromText(pointGroupsString);
    setPointGroups(pointsData);
  }

  useEffect(
    () => {
      localStorage.setItem("wzorcowkAppPointGroups", JSON.stringify(pointGroups));
    },
    [ pointGroups ]
  )

  return (
    <div className="relative">
      <div className="flex flex-col p-10">
        {/* <div className="flex justify-center">
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={saveData}>Zapisz i nie zgub!</button>
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={getData}>Oddaj zapisane!</button>
          <button className="bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded m-2" onClick={downloadData}>Dej mnie na dysk!</button>
        </div> */}
        <Card
          pointsGroups={pointGroups}
          pointsAmount={24}
          courseName={CourseName.TZ}
          baseTimeLimit={150}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointGroups}
          pointsAmount={20}
          courseName={CourseName.TU}
          baseTimeLimit={130}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointGroups}
          pointsAmount={16}
          courseName={CourseName.TT}
          baseTimeLimit={130}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointGroups}
          pointsAmount={15}
          courseName={CourseName.TP_TD}
          baseTimeLimit={135}
          additionalTimeLimit={40}
        ></Card>
        <Card
          pointsGroups={pointGroups}
          pointsAmount={11}
          courseName={CourseName.TN}
          baseTimeLimit={110}
          additionalTimeLimit={35}
        ></Card>
      </div>
      <PointGroups handleAddingPointGroupsData={handleAddingPointGroupsData} />
    </div>
  )
}