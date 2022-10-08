import React, { useEffect, useState } from "react";
import { getPointsGroupsFromText } from "../domain/get-point-groups-from-string";
import { CourseName } from "../domain/enums";
import { Card } from "./Card";
import { PointsGroups } from "./panels/group-points/PointsGroups";
import { Courses } from "./panels/courses/Courses";

const POINTS_GROUPS: number[][] = [];

export interface CourseConfiguration {
  name: CourseName;
  pointsAmount: number;
  baseTimeLimit: number;
  additionalTimeLimit: number;
  task?: string;
}

export function App() {
  const [ pointsGroupsString, setPointsGroupsString ] = useState(setInitialPointsGroupsString);
  const [ pointsGroups, setPointsGroups ] = useState(POINTS_GROUPS);
  const [ coursesConfiguration, setCoursesConfiguration ] = useState<CourseConfiguration[]>(
    [
      {
        name: CourseName.TZ,
        pointsAmount: 0,
        baseTimeLimit: 0,
        additionalTimeLimit: 0,
        task: ""
      },
      {
        name: CourseName.TU,
        pointsAmount: 0,
        baseTimeLimit: 0,
        additionalTimeLimit: 0,
        task: ""
      },
      {
        name: CourseName.TT,
        pointsAmount: 0,
        baseTimeLimit: 0,
        additionalTimeLimit: 0,
        task: ""
      },
      {
        name: CourseName.TP_TD,
        pointsAmount: 0,
        baseTimeLimit: 0,
        additionalTimeLimit: 0,
        task: ""
      },
      {
        name: CourseName.TN,
        pointsAmount: 0,
        baseTimeLimit: 0,
        additionalTimeLimit: 0,
        task: ""
      }
    ]
  )

  function handleAddingPointsGroupsData(pointsGroupsString: string): void {
    setPointsGroupsString(pointsGroupsString);
  }

  function handleAddingCoursesConfiguration(coursesConfiguration: CourseConfiguration[]): void {
    setCoursesConfiguration(coursesConfiguration);
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

  const cards = coursesConfiguration.map(course => {
    return <div className="flex flex-col p-10 pl-14">
      <Card
        pointsGroups={pointsGroups}
        courseName={course.name}
        pointsAmount={course.pointsAmount}
        baseTimeLimit={course.baseTimeLimit}
        additionalTimeLimit={course.additionalTimeLimit}
        task={course.task}
      />
    </div>
  })

  return (
    <div className="relative">
      <PointsGroups pointsGroupsString={pointsGroupsString} handleAddingPointsGroupsData={handleAddingPointsGroupsData} />
      <Courses coursesConfiguration={coursesConfiguration} handleAddingCoursesConfiguration={handleAddingCoursesConfiguration}/>
      {cards}
    </div>
  )
}