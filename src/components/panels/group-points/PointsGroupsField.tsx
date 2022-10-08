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
        <p>Stowarzysze podziel<span className="font-bold"> przecinkiem</span>, a grupy <span className="font-bold"> średnikiem</span>.</p>
        <p>Nie musisz wpisywać punktów, które nie mają żadnych PSów.</p>
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