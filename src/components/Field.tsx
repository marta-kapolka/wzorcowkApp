import React from "react";
import { FieldType } from "../domain/enums";
import { FieldInput } from "./FieldInput";
import { Image } from "./Image";
import { PointDescriptionInput } from "./PointDescriptionInput";

interface Props {
  type: FieldType;
  description: string | undefined;
  handleDescriptionChange?: (value: string) => void;
  pointPuncherNumber?: number;
  mainPointPuncherNumber?: number;
  handlePuncherNumberChange?: (value: number) => void;
}

export function Field(props: Props) {
  const pointDescription = props.type !== FieldType.Fake ?
    <PointDescriptionInput
      value={props.description?.toString()}
      disabled={props.type !== FieldType.Input}
      handleDescriptionChange={props.handleDescriptionChange!}
    /> :
    undefined;

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
      {pointDescription}
      {input}
      {value}
      {image}
    </div>
  )
}