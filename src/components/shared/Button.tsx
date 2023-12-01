import React from "react"

interface Props {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export function Button({text, disabled, onClick}: Props) {
const className = disabled ?
  "bg-transparent text-gray-400 text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded cursor-not-allowed" :
  "bg-transparent hover:bg-teal-700 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded"

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}