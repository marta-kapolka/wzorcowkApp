import React from "react"

interface Props {
  courseName: string;
  baseTimeLimit: number;
  additionalTimeLimit: number;
  task?: string;
}

export function CardDescription(props: Props) {
  const task = props.task ? <span className="text-3xl p-1 mr-8">zadanie: <span className="font-bold">{props.task}</span></span> : null;
  
  return (
    <div className="h-14 p-1">
      <span className="text-3xl font-bold p-1 mr-8">{props.courseName}</span>
      <span className="text-3xl font-bold p-1 mr-8">{props.baseTimeLimit}'+{props.additionalTimeLimit}'</span>
      <span className="text-3xl font-bold p-1 mr-8">({props.baseTimeLimit + props.additionalTimeLimit}')</span>
      {task}
    </div>
  )
}