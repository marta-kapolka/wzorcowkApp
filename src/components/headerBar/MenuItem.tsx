import React from "react";
import { Button } from "../shared/Button";

interface Props {
  text: string;
  disabled?: boolean;
  itemHandler: () => void;
}

export const MenuItem = ({text, disabled, itemHandler}: Props): JSX.Element => {
  return (
    <li className="p-2"><Button text={text} disabled={disabled} onClick={itemHandler}/></li>
  )
} 