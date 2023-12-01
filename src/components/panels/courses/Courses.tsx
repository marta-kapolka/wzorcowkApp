import React, {  useEffect, useState } from "react";
import { Button } from "../../shared/Button";
import { CourseForm } from "./CourseForm";
import { CourseConfiguration } from "../../../components/App";
import { CourseName } from "../../../domain/enums";
import { PanelHeader } from "../PanelHeader";

interface Props {
  isVisible: boolean;
  coursesConfiguration: CourseConfiguration[];
  closePanel: () => void;
  handleCoursesConfigurationAdd: (coursesConfiguration: CourseConfiguration[]) => void;
  handleCourseSelect: (course: CourseName) => void;
}

export function Courses(props: Props) {
  const [ courseFormsData, setCourseFormsData ] = useState<CourseConfiguration[]>(props.coursesConfiguration)

  function togglePanel() {
    const panel = document.querySelector("#courses-panel");
    if (props.isVisible) {
      panel?.classList.remove("-translate-x-full");
      panel?.classList.add("z-50");
    } else {
      panel?.classList.add("-translate-x-full");
      setTimeout(() => panel?.classList.remove("z-50"), 500);
      props.closePanel();
    }
  }

  useEffect((): void => {
    togglePanel();
  }, [props.isVisible])

  function handleCourseFormChange(courseFormData: CourseConfiguration): void {
    const courseName = courseFormData.name;
    const dataToChangeIndex = courseFormsData.findIndex(form => form.name === courseName);
    if (dataToChangeIndex !== -1) {
      const newCourseFormsData = [ ...courseFormsData ];
      newCourseFormsData.splice(dataToChangeIndex, 1, courseFormData)
      setCourseFormsData(newCourseFormsData);
    }
  }

  const courseForms = props.coursesConfiguration
    .filter(course => course.isSelected)
    .map(course =>
      <CourseForm
        key={course.name}
        courseConfiguration={course}
        handleCourseFormChange={handleCourseFormChange}
      />
    )

  const courses = props.coursesConfiguration
    .map(course =>
      <div key={course.name} className="flex justify-baseline my-2">
        <input
          className="mr-2 h-6 w-6"
          id={`${course.name}-select-checkbox`}
          type="checkbox"
          checked={course.isSelected}
          onChange={() => props.handleCourseSelect(course.name)}
        />
        <label htmlFor={`${course.name}-select-checkbox`} className="text-xl font-bold mr-6">{course.name}</label>
      </div>
    )

  return (
    <aside 
      className="box-border fixed flex flex-col bg-white h-screen w-1/3 min-w-[400px] top-0 left-0 p-4 border-r border-r-4 border-r-solid border-r-teal-700 -translate-x-full transition-all duration-500 ease-in"
      id="courses-panel"
    >
      <PanelHeader headerText="Wybierz trasy" handleClosePanel={props.closePanel}/>
      <div className="overflow-auto">
        <div className="flex flex-wrap mb-4">
          {courses}
        </div>
        <hr className="my-4" />
        {courseForms}
        <div className="flex justify-center my-12">
          <Button
            text={"Takie trasy będą!"}
            onClick={() => {
              props.handleCoursesConfigurationAdd(courseFormsData);
              props.closePanel();
            }}
          />
        </div>
      </div>
    </aside>
  )
}