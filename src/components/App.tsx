import React, { useEffect, useState } from "react";
import { getPointsGroupsFromText } from "../domain/get-point-groups-from-string";
import { CourseName } from "../domain/enums";
import { Card } from "./Card";
import { PointsGroups } from "./panels/group-points/PointsGroups";
import { Courses } from "./panels/courses/Courses";
import { jsPDF } from "jspdf";
import { HeaderBar } from "./headerBar/HeaderBar";

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

export function App(): JSX.Element {
  const [ pointsGroupsString, setPointsGroupsString ] = useState<string>(setInitialPointsGroupsString);
  const [ pointsGroups, setPointsGroups ] = useState<number[][]>([]);
  const [ coursesConfiguration, setCoursesConfiguration ] = useState<CourseConfiguration[]>(setInitialCoursesConfiguration);
  const [ isPointsGroupsPanelVisible, setIsPointsGroupsPanelVisible ] = useState<boolean>(false);
  const [ isCoursesPanelVisible, setIsCoursesPanelVisible ] = useState<boolean>(false);
  const [ isOverlayVisible, setIsOverlayVisible ] = useState<boolean>(false);

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

  function showPointsGroupsPanel(): void {
    setIsPointsGroupsPanelVisible(true);
  }

  function closePointsGroupsPanel(): void {
    setIsPointsGroupsPanelVisible(false);
  }

  function showCoursesPanel(): void {
    setIsCoursesPanelVisible(true);
  }

  function closeCoursesPanel(): void {
    setIsCoursesPanelVisible(false);
  }

  function handleDownload(coursesToDownloadNames?: CourseName[]): void {
    const coursesToDownload = !!coursesToDownloadNames?.length ?
      coursesConfiguration.filter(course => coursesToDownloadNames.includes(course.name)) :
      coursesConfiguration;

    coursesToDownload
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
  }, [ pointsGroupsString ])

  useEffect((): void => {
    if (isCoursesPanelVisible || isPointsGroupsPanelVisible) {
      setIsOverlayVisible(true);
    } else {
      setIsOverlayVisible(false);
    }
  }, [isCoursesPanelVisible, isPointsGroupsPanelVisible])

  const cards = coursesConfiguration
    .filter(course => course.isSelected)
    .map(course => {
      return <div className="flex flex-col pt-16 px-16" key={course.name}>
        <Card
          pointsGroups={pointsGroups}
          courseName={course.name}
          pointsAmount={course.pointsAmount}
          baseTimeLimit={course.baseTimeLimit}
          additionalTimeLimit={course.additionalTimeLimit}
          task={course.task}
          downloadHandler={handleDownload}
        />
      </div>
  })

  const noCardsText = <p className="text-xl text-center text-red-700 font-bold mt-48 w-full">Ale wybierz jakieś trasy!</p>

  return (
    <div className="relative mb-16">
      <PointsGroups
        isVisible={isPointsGroupsPanelVisible}
        closePanel={closePointsGroupsPanel}
        pointsGroupsString={pointsGroupsString}
        handleAddingPointsGroupsData={handleAddingPointsGroupsData}
      />
      <Courses
        isVisible={isCoursesPanelVisible}
        closePanel={closeCoursesPanel}
        coursesConfiguration={coursesConfiguration}
        handleCoursesConfigurationAdd={handleCoursesConfigurationAdd}
        handleCourseSelect={handleCourseSelect}
      />

      {isOverlayVisible ?
        <div id="overlay" className="absolute w-screen h-screen bg-white bg-opacity-75 z-30"></div> :
        null
      }

      <HeaderBar
        isAnyCourseSelected={coursesConfiguration.some(course => course.isSelected)}
        showPointsGroupsPanel={showPointsGroupsPanel}
        showCoursesPanel={showCoursesPanel}
        downloadHandler={handleDownload}
      />
      {cards.length ? cards : noCardsText}
    </div>
  )
}