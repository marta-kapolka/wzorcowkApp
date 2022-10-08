import React from "react";

interface Props {
  value: string;
  handleFieldChange: (value: string) => void;
}

export function PointsGroupsField(props: Props) {

  return (
    <>
      <label htmlFor="points-groups-field">Dej punkty - podziel ',' i ';'</label>
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