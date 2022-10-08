import React from "react";
import { Images, IMAGE_URLS } from "../img/image-index";

interface Props {
  number: number;
}

export function Image(props: Props) {
  return props.number ?
    <img src={IMAGE_URLS[props.number as keyof Images]} className="max-h-8 max-w-8 absolute left-4 bottom-2" /> :
    null;
}
