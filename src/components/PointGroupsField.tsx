import React, { useState } from "react";

interface Props {
  value: string;
  handleFieldChange: (value: string) => void;
}

export function PointGroupsField(props: Props) {

  return (
    <>
      <label htmlFor="point-groups-field">Dej punkty - podziel ',' i ';'</label>
      <textarea
        rows={16}
        value={props.value}
        className="rounded-lg border border-gray-300 mt-4 p-2"
        onChange={(event) => props.handleFieldChange(event.target.value)}
        id="point-groups-field"
      >
      </textarea>
    </>
  )
}