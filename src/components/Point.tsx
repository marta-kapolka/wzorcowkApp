import React, { useState } from "react";
import { getFakePointNumbers } from "../domain/get-fake-point-numbers";
import { FieldType } from "../domain/enums";
import { Field } from "./Field";

interface Props {
  number: number;
  pointsGroups: number[][];
}

export function Point(props: Props) {
  const [ mainPointPuncherNumber, setMainPointPuncherNumber ] = useState(0);

  const fakePointNumbers = getFakePointNumbers(mainPointPuncherNumber, props.pointsGroups);
  const fakePoints: JSX.Element[] = [];

  const fakePointsFieldsAmount = Math.max(...props.pointsGroups.map(group => group.length - 1)) + 1

  fakePointNumbers.map(fakePointNumber => {
    fakePoints.push(<Field type={FieldType.Fake} number={props.number} pointPuncherNumber={fakePointNumber}></Field>)
  })

  while (fakePoints.length < fakePointsFieldsAmount) {
    fakePoints.push(<Field type={FieldType.Fake} number={props.number}></Field>)
  }
  
  return (
    <div className="flex flex-col-reverse self-end">
      <Field
        type={FieldType.Input}
        number={props.number}
        mainPointPuncherNumber={mainPointPuncherNumber}
        handlePuncherNumberChange={(value) => setMainPointPuncherNumber(value)}
        ></Field>
      <br/>
      <Field type={FieldType.Main} number={props.number} pointPuncherNumber={mainPointPuncherNumber}></Field>
      {fakePoints}
    </div>
  )
}