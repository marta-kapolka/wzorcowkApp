import React from "react";
import { CourseName } from "../domain/enums";
import { CardDescription } from "./CardDescription";
import { Point } from "./Point";

interface Props {
  pointsGroups: number[][];
  courseName: CourseName;
  pointsAmount: number;
  baseTimeLimit: number;
  additionalTimeLimit: number;
  task?: string;
}

export function Card(props: Props) {
  const points: JSX.Element[] = [];
  
  for (let i = 1; i <= props.pointsAmount; i++) {
    points.push(<Point number={i} pointsGroups={props.pointsGroups}></Point>)
  }
  
  return (
    <div className="pb-16">
      <CardDescription
        courseName={props.courseName}
        baseTimeLimit={props.baseTimeLimit}
        additionalTimeLimit={props.additionalTimeLimit}
        task={props.task}
      ></CardDescription>
      <div className="flex">
        {points}
      </div>
    </div>
  )
}