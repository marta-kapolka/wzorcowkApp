import React from "react";
import { CourseName } from "../domain/enums";
import { CardDescription } from "./CardDescription";
import { Point } from "./Point";
import { Button } from "./shared/Button";

interface Props {
  pointsGroups: number[][];
  courseName: CourseName;
  pointsAmount: number;
  baseTimeLimit: number;
  additionalTimeLimit: number;
  task?: string;
  downloadHandler: (course: CourseName[]) => void;
}

export function Card(props: Props) {
  const points: JSX.Element[] = [];
  
  for (let i = 1; i <= props.pointsAmount; i++) {
    points.push(<Point initialDescription={i.toString()} pointsGroups={props.pointsGroups} key={i.toString()}></Point>)
  }

  const noPointsText = <p className="text-xl text-center text-red-700 font-bold my-4 w-full">..no i zapodaj punkty dla trasy {props.courseName}!</p>
  
  return (
    <div className="relative">
      <div className="absolute right-0">
        <Button
          text={`Drukuj ${props.courseName}`}
          onClick={() => props.downloadHandler([props.courseName])}
        />
      </div>
      <div id={props.courseName}>
        <CardDescription
          courseName={props.courseName}
          baseTimeLimit={props.baseTimeLimit}
          additionalTimeLimit={props.additionalTimeLimit}
          task={props.task}
        ></CardDescription>
        <div className="flex">
          {points.length ? points : noPointsText}
        </div>
      </div>
    </div>
  )
}