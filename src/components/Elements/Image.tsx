import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {ImageElement, Size} from "../../model/Types";
import { select } from "./TextElement";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import Stroke from "./Stroke";
import ResizeToken from "./ResizeToken";
import useResize from "../../customHooks/useResize";
type ImageComponentProps = {
  parentSize: Size;
  element: ImageElement;
  isActive: Boolean;
};
const ImageComponent: FC<ImageComponentProps> = ({parentSize, element, isActive} : ImageComponentProps) => {
  const dispatch = useDispatch();
  const {onMouseDown, Position} = useDragAndDrop({element, parentSize, isActive});
  const {onMouseDownResize, resizePosition} = useResize({element, parentSize, isActive});

  return (
  <>  
    <image xlinkHref={element.source}
      onClick={()=>dispatch(select(element.elementID))}
      style={{cursor: "pointer"}}
      x={Position.x + "px"} 
      y={Position.y + "px"} 
      height={element.size.height+resizePosition.x + "px"} 
      width={element.size.width+resizePosition.y + "px"}
    />
  <Stroke onMouseDown={onMouseDown} isActive={isActive} position={element.Position} size={element.size}/>
  <ResizeToken onMouseDown={onMouseDownResize} isActive={isActive} position={Position} size={element.size}/>
  </>  
    );
};

export default ImageComponent;
