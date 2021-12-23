import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {ImageElement, Size} from "../../model/Types";
import { select } from "./TextElement";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
type ImageComponentProps = {
  parentSize: Size;
  element: ImageElement;
};
const ImageComponent: FC<ImageComponentProps> = ({parentSize, element} : ImageComponentProps) => {
  const dispatch = useDispatch();
  const {onMouseDown} = useDragAndDrop({element, parentSize});
  


  return (<image xlinkHref={element.source}
    onClick={()=>dispatch(select(element.elementID))}
    onMouseDown={onMouseDown}
    style={{cursor: "pointer"}}
    x={element.Position.x + "px"} 
    y={element.Position.y + "px"} 
    height={element.size.height + "px"} 
    width={element.size.width + "px"}
  />);
};

export default ImageComponent;
