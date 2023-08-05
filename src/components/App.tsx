import React, { useEffect, useState } from "react";
import { getPointsGroupsFromText } from "../domain/get-point-groups-from-string";
import { CourseName } from "../domain/enums";
import { Card } from "./Card";
import { PointsGroups } from "./panels/group-points/PointsGroups";
import { Courses } from "./panels/courses/Courses";
import { jsPDF } from "jspdf";

const ALL_POSSIBLE_COURSES = [
  CourseName.TZ,
  CourseName.TU,
  CourseName.TT,
  CourseName.TP,
  CourseName.TP_TD,
  CourseName.TD,
  CourseName.TN,
]

export interface CourseConfiguration {
  name: CourseName;
  isSelected: boolean;
  pointsAmount: number;
  baseTimeLimit: number;
  additionalTimeLimit: number;
  task?: string;
}

export function App() {
  const [ pointsGroupsString, setPointsGroupsString ] = useState<string>(setInitialPointsGroupsString);
  const [ pointsGroups, setPointsGroups ] = useState<number[][]>([]);
  const [ coursesConfiguration, setCoursesConfiguration ] = useState<CourseConfiguration[]>(setInitialCoursesConfiguration)

  function setInitialPointsGroupsString(): string {
    const localStorageSavedPointsGroupsString = localStorage.getItem("wzorcowkAppPointsGroupsString");
    return localStorageSavedPointsGroupsString || "";
  }

  function setInitialCoursesConfiguration(): CourseConfiguration[] {
    const configuration = ALL_POSSIBLE_COURSES
      .map(course => {
        return {
          name: course,
          isSelected: false,
          pointsAmount: 0,
          baseTimeLimit: 0,
          additionalTimeLimit: 0,
          task: ""
        }
      })
    return configuration; 
  }

  function handleAddingPointsGroupsData(pointsGroupsString: string): void {
    setPointsGroupsString(pointsGroupsString);
  }

  function handleCoursesConfigurationAdd(coursesConfiguration: CourseConfiguration[]): void {
    setCoursesConfiguration(coursesConfiguration);
  }

  function handleCourseSelect(courseToChange: CourseName): void {
    const newCoursesConfiguration = [ ...coursesConfiguration ];

    const courseConfigurationToChange = newCoursesConfiguration.find(course => course.name === courseToChange);

    if (courseConfigurationToChange) {
      courseConfigurationToChange.isSelected = !courseConfigurationToChange.isSelected
    }
    
    if (courseConfigurationToChange) {
      const courseConfigurationToChangeIndex = newCoursesConfiguration.indexOf(courseConfigurationToChange);
      newCoursesConfiguration.splice(courseConfigurationToChangeIndex, 1, courseConfigurationToChange)
    }

    setCoursesConfiguration(newCoursesConfiguration)
  }

  function downloadPdf() {
    coursesConfiguration
      .forEach(course => {
        const pdfDocument = new jsPDF({
          orientation: 'l',
          unit: 'mm',
          format: 'a4',
        });

        const elementToPrint = document.querySelector(`#${course.name}`) as HTMLElement;

        if (elementToPrint) {
          pdfDocument.html(elementToPrint, {
            callback: () => {pdfDocument.save(`wzorcowka-${course.name}.pdf`)},
            margin: 5,
            width: 287,
            windowWidth: Math.max(64 * course.pointsAmount, 1024)
          });
        }
      })
  }

  useEffect((): void => {
    const pointsData = getPointsGroupsFromText(pointsGroupsString);
    setPointsGroups(pointsData);
    localStorage.setItem("wzorcowkAppPointsGroupsString", pointsGroupsString);
  },
  [ pointsGroupsString ])

  const cards = coursesConfiguration
    .filter(course => course.isSelected)
    .map(course => {
      return <div className="flex flex-col p-10 pl-20" key={course.name}>
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

  const noCardsText =
  <>
    <p className="text-xl text-center text-red-700 font-bold mt-16 w-full">Ale wybierz jakieś trasy!</p>
    <p className="text-xl text-center text-red-700 mt-4 w-full">Szukaj pod fioletowym wysuwaczem</p>
  </>

  return (
    <div className="relative mb-16">
      <PointsGroups pointsGroupsString={pointsGroupsString} handleAddingPointsGroupsData={handleAddingPointsGroupsData} />
      <Courses
        coursesConfiguration={coursesConfiguration}
        handleCoursesConfigurationAdd={handleCoursesConfigurationAdd}
        handleCourseSelect={handleCourseSelect}
      />
      <button onClick={downloadPdf}>Dej PDFa</button>
      {cards.length ? cards : noCardsText}
    </div>
  )
}