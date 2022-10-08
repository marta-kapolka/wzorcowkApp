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
    points.push(<Point number={i} pointsGroups={props.pointsGroups} key={i.toString()}></Point>)
  }

  const noPointsText = <p className="text-xl text-center text-red-700 font-bold my-4 w-full">..no i zapodaj jakieś punkty dla trasy!</p>
  
  return (
    <>
      <CardDescription
        courseName={props.courseName}
        baseTimeLimit={props.baseTimeLimit}
        additionalTimeLimit={props.additionalTimeLimit}
        task={props.task}
      ></CardDescription>
      <div className="flex">
        {points.length ? points : noPointsText}
      </div>
    </>
  )
}