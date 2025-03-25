import React from "react";

interface Props {
  value?: number;
  handlePuncherNumberChange: (value: number) => void;
}

export function FieldInput(props: Props) {
  return (
    <div className="absolute bottom-1 left-3 flex">
      <input
        placeholder="nr"
        type="text"
        className="w-10 text-lg text-center placeholder-gray-400"
        value={props.value}
        onChange={event => props.handlePuncherNumberChange(Number(event.target.value))}
      >
      </input>
    </div>
  )
}