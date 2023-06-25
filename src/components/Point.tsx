import React, { useState } from "react";
import { getFakePointNumbers } from "../domain/get-fake-point-numbers";
import { FieldType } from "../domain/enums";
import { Field } from "./Field";

interface Props {
  initialDescription: string;
  pointsGroups: number[][];
}

export function Point(props: Props) {
  const [ mainPointPuncherNumber, setMainPointPuncherNumber ] = useState<number | undefined>(undefined);
  const [ description, setDescription ] = useState<string>(props.initialDescription);

  const fakePointNumbers = mainPointPuncherNumber ?
    getFakePointNumbers(mainPointPuncherNumber, props.pointsGroups) :
    [];
    
  const fakePoints: JSX.Element[] = [];

  const fakePointsFieldsAmount = Math.max(...props.pointsGroups.map(group => group.length - 1)) + 1

  fakePointNumbers.map(fakePointNumber => {
    fakePoints.push(<Field type={FieldType.Fake} description={props.initialDescription} pointPuncherNumber={fakePointNumber}></Field>)
  })

  while (fakePoints.length < fakePointsFieldsAmount) {
    fakePoints.push(<Field type={FieldType.Fake} description={props.initialDescription}></Field>)
  }
  
  return (
    <div className="flex flex-col-reverse self-end">
      <Field
        type={FieldType.Input}
        description={description}
        handleDescriptionChange={(value: string) => setDescription(value)}
        mainPointPuncherNumber={mainPointPuncherNumber}
        handlePuncherNumberChange={(value: number) => setMainPointPuncherNumber(value)}
      />
      <br/>
      <Field
        type={FieldType.Main}
        description={description}
        pointPuncherNumber={mainPointPuncherNumber}
      />
      {fakePoints}
    </div>
  )
}