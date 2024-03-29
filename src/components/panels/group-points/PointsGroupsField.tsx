import React from "react";

interface Props {
  value: string;
  handleFieldChange: (value: string) => void;
}

export function PointsGroupsField({value, handleFieldChange}: Props) {

  return (
    <>
      <label htmlFor="points-groups-field">
        <p>Stowarzysze podziel<span className="font-bold"> przecinkiem</span>, a grupy <span className="font-bold"> średnikiem</span>.</p>
        <p>Nie musisz wpisywać punktów, które nie mają żadnych PSów.</p>
      </label>
      <textarea
        rows={8}
        value={value}
        className="rounded-lg text-xl border border-gray-300 mt-4 p-2"
        onChange={(event) => handleFieldChange(event.target.value)}
        id="points-groups-field"
      >
      </textarea>
    </>
  )
}