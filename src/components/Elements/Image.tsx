import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {ImageElement, Size} from "../../model/Types";
import { select } from "./TextElement";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
type ImageComponentProps = {
  parentSize: Size;
  element: ImageElement;
  isActive: Boolean;
};
const ImageComponent: FC<ImageComponentProps> = ({parentSize, element, isActive} : ImageComponentProps) => {
  const dispatch = useDispatch();
  const {onMouseDown, Position} = useDragAndDrop({element, parentSize, isActive});
  


  return (<image xlinkHref={element.source}
    onClick={()=>dispatch(select(element.elementID))}
    onMouseDown={isActive?onMouseDown:()=>{}}
    style={{cursor: "pointer"}}
    x={Position.x + "px"} 
    y={Position.y + "px"} 
    height={element.size.height + "px"} 
    width={element.size.width + "px"}
  />);
};

export default ImageComponent;
