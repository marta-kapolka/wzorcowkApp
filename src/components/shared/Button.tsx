import React from "react"

interface Props {
  text: string;
  color?: string;
  onClick: () => void;
}

export function Button(props: Props) {
  const color = props.color || "teal";
  const className = `bg-transparent hover:bg-${color}-700 text-${color}-700 font-semibold hover:text-white py-2 px-4 border border-${color}-700 hover:border-transparent rounded m-`
  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}