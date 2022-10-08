import React, {  useState } from "react";
import { Button } from "../../shared/Button";
import { CourseForm } from "./CourseForm";
import { CourseConfiguration } from "../../../components/App";
import { CourseName } from "../../../domain/enums";

interface Props {
  coursesConfiguration: CourseConfiguration[];
  handleCoursesConfigurationAdd: (coursesConfiguration: CourseConfiguration[]) => void;
  handleCourseSelect: (course: CourseName) => void;
}

export function Courses(props: Props) {
  const [ isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [ courseFormsData, setCourseFormsData ] = useState<CourseConfiguration[]>(props.coursesConfiguration)

  function togglePanel() {
    const panel = document.querySelector("#courses-panel");
    const buttonArrow = document.querySelector("#courses-panel-button-arrow")
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
      className="box-border fixed flex flex-col bg-white h-screen w-1/3 min-w-[400px] z-20 top-0 left-0 p-6 border-r border-r-4 border-r-solid border-r-indigo-700 -translate-x-full transition-all duration-500 ease-in"
      id="courses-panel"
    >
      <div className="overflow-auto">
        <div className="flex flex-wrap mb-4">
          {courses}
        </div>
        <hr className="my-4" />
        {courseForms}
        <div className="flex justify-center my-12">
          <Button
            text={"Takie trasy będą!"}
            onClick={() => props.handleCoursesConfigurationAdd(courseFormsData)}
          />
        </div>
      </div>
      <button 
        className="absolute top-20 -right-1 translate-x-10 bg-indigo-700 rounded-tr-xl rounded-br-xl h-12 w-10"
        onClick={togglePanel}
      >
        <svg
          className="w-6 h-8 ml-2"
          id="courses-panel-button-arrow"
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