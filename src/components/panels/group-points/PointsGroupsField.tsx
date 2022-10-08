import React from "react";

interface Props {
  value: string;
  handleFieldChange: (value: string) => void;
}

export function PointsGroupsField(props: Props) {

  return (
    <>
      <label htmlFor="points-groups-field">
        <p className="text-xl font-bold">Dej punkty!</p>
        <p className="text-xl">Stowarzysze podziel znakiem
          <span className="font-bold"> ',' </span>
          , a grupy znakiem
          <span className="font-bold"> ';' </span>
        </p>
      </label>
      <textarea
        rows={16}
        value={props.value}
        className="rounded-lg border border-gray-300 mt-4 p-2"
        onChange={(event) => props.handleFieldChange(event.target.value)}
        id="points-groups-field"
      >
      </textarea>
    </>
  )
}