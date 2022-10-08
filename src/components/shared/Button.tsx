import React from "react"

interface Props {
  text: string;
  onClick: () => void;
}

export function Button(props: Props) {
  return (
    <button
      className="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-700 hover:border-transparent rounded"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}