import { Button } from "../shared/Button"
import React from "react"

interface Props {
  headerText: string;
  handleClosePanel: () => void;
}

export const PanelHeader = ({headerText, handleClosePanel}: Props): JSX.Element => {
  return (
    <header className="flex justify-between items-center pb-4 mb-4 border-b border-b-solid border-b-teal-700">
      <h2 className="text-xl font-semibold uppercase">{headerText}</h2>
      <Button text="X" onClick={handleClosePanel} />
    </header>
  )
}