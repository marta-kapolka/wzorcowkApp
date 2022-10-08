import React from "react";
import { FieldType } from "../domain/enums";
import { FieldInput } from "./FieldInput";
import { Image } from "./Image";

interface Props {
  type: FieldType;
  number: number;
  pointPuncherNumber?: number;
  mainPointPuncherNumber?: number;
  handlePuncherNumberChange?: (value: number) => void;
}

export function Field(props: Props) {
  const description = props.type !== FieldType.Fake ? props.number.toString() : "";

  const input = props.type === FieldType.Input ?
    <FieldInput
      value={props.mainPointPuncherNumber || undefined }
      handlePuncherNumberChange={props.handlePuncherNumberChange!}
    ></FieldInput> :
    null;

  const value = props.type !== FieldType.Input ?
    <p className="absolute top-1 left-1 text-xs">({props.pointPuncherNumber?.toString()})</p> :
    null;

  const image = props.type !== FieldType.Input ?
    <Image number={props.pointPuncherNumber!}></Image> :
    null;

  return (
    <div className="relative w-16 h-16 p-1 border border-black border-solid">
      <p className="absolute top-1 right-1 text-xs font-bold">{description}</p>
      {input}
      {value}
      {image}
    </div>
  )
}