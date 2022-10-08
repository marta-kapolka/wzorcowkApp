import React, { useEffect, useState } from "react";
import { CourseConfiguration } from "../../../components/App";

interface Props {
  courseConfiguration: CourseConfiguration;
  handleCourseFormChange: (formData: CourseConfiguration) => void;
}

export function CourseForm(props: Props) {
  const [ formData, setFormData ] = useState<CourseConfiguration>(props.courseConfiguration);

  useEffect(() => props.handleCourseFormChange(formData), [ formData ])

  return (
    <div className="mb-8">
      <p className="text-xl font-bold mb-4">Trasa {formData.name}</p>
      <div className="flex items-baseline mb-2">
        <label htmlFor={`${formData.name}-points-amount-input`} className="mr-4">Ilość PK</label>
        <input
          value={formData.pointsAmount}
          onChange={event => {
            setFormData({
              ...formData,
              pointsAmount: Number(event.target.value),
            })
          }}
          id={`${formData.name}-points-amount-input`}
          type="number"
          min={0}
          className="rounded-lg border border-gray-300 text-center font-bold p-2 h-8 w-12"
        />
      </div>
      <div className="flex items-baseline mb-2">
        <label htmlFor={`${formData.name}-base-time-limit-input`} className="mr-4">Limit</label>
        <input
          value={formData.baseTimeLimit}
          onChange={event => {
            setFormData({
              ...formData,
              baseTimeLimit: Number(event.target.value),
            })
          }}
          id={`${formData.name}-base-time-limit-input`}
          type="number"
          min={0}
          className="rounded-lg border border-gray-300 text-center font-bold p-2 h-8 w-12"
        />
        <label htmlFor={`${formData.name}-additional-time-limit-input`} className="mx-2">+</label>
        <input
          value={formData.additionalTimeLimit}
          onChange={event => {
            setFormData({
              ...formData,
              additionalTimeLimit: Number(event.target.value),
            })
          }}
          id={`${formData.name}-additional-time-limit-input`}
          type="number"
          min={0}
          className="rounded-lg border border-gray-300 text-center font-bold p-2 h-8 w-12"
        />
      </div>
      <div className="flex items-baseline mb-2">
        <label htmlFor={`${formData.name}-task-input`} className="mr-4">Zadanie</label>
        <input
          value={formData.task}
          onChange={event => {
            setFormData({
              ...formData,
              task: event.target.value,
            })
          }}
          id={`${formData.name}-task-input`}
          placeholder="(odpowiedź)"
          className="rounded-lg border border-gray-300 text-center font-bold p-2 h-8"
        />
      </div>
    </div>
  )
}