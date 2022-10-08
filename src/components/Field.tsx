import React from "react";
import { FieldType } from "../domain/enums";
import { FieldInput } from "./FieldInput";
import { Image } from "./Image";

interface Props {
  type: FieldType;
  number: number | undefined;
  pointPuncherNumber?: number;
  mainPointPuncherNumber?: number;
  handlePuncherNumberChange?: (value: number) => void;
}

export function Field(props: Props) {
  const description = props.type !== FieldType.Fake ?
    <p className="absolute top-1 right-1 text-xs text-gray-500 font-bold">
      {props.number?.toString()}
    </p> :
    "";

  const input = props.type === FieldType.Input ?
    <FieldInput
      value={props.mainPointPuncherNumber || undefined }
      handlePuncherNumberChange={props.handlePuncherNumberChange!}
    /> :
    null;

  const value = props.type !== FieldType.Input ?
    <p className="absolute top-1 left-1 text-xs text-gray-500">
      {
        props.pointPuncherNumber?.toString() ?
        `(${props.pointPuncherNumber?.toString()})` :
        ""
      }
    </p> :
    null;

  const image = props.type !== FieldType.Input ?
    <Image number={props.pointPuncherNumber!}/> :
    null;

  return (
    <div className="relative w-16 h-16 p-1 border border-black border-solid">
      {description}
      {input}
      {value}
      {image}
    </div>
  )
}