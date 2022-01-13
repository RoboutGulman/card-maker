import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {ImageElement, Size} from "../../model/Types";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import Stroke from "./Stroke";
import ResizeToken from "./ResizeToken";
import useResize from "../../customHooks/useResize";
import { select } from "../../model/components/Elements/TextElement";
type ImageComponentProps = {
  parentSize: Size;
  element: ImageElement;
  isActive: Boolean;
};
const ImageComponent: FC<ImageComponentProps> = ({parentSize, element, isActive} : ImageComponentProps) => {
  const dispatch = useDispatch();
  const {onMouseDown, position} = useDragAndDrop({element, parentSize, isActive});
  const {onMouseDownResize, resizePosition} = useResize({element, parentSize, isActive});
  const size={width:element.size.width+resizePosition.x, height:element.size.height+resizePosition.y}

  return (
  <>  
    <image
      preserveAspectRatio="none"
      href={element.source}
      onClick={()=>dispatch(select(element.elementID))}
      style={{cursor: "pointer"}}
      x={position.x + "px"} 
      y={position.y + "px"} 
      height={size.height + "px"} 
      width={size.width + "px"}
    />
  <Stroke onMouseDown={onMouseDown} isActive={isActive} position={position} size={size}/>
  <ResizeToken onMouseDown={onMouseDownResize} isActive={isActive} position={position} size={size}/>
  </>  
    );
};

export default ImageComponent;
