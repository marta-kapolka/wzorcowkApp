import React from "react";

interface Props {
  value: string | undefined;
  disabled: boolean;
  handleDescriptionChange: (value: string) => void;
}

export function PointDescriptionInput(props: Props) {
  return (
    <input 
      type="text"
      className="absolute top-0 right-0 w-8 text-right pr-1 font-semibold bg-transparent"
      value={props.value}
      disabled={props.disabled}
      onChange={event => props.handleDescriptionChange(event.target.value)}
    />
  )
}