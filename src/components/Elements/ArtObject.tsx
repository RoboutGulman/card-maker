import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {Size, ArtObjectElement, ArtObjectType} from "../../model/Types";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import Stroke from "./Stroke";
import ResizeToken from "./ResizeToken";
import useResize from "../../customHooks/useResize";
import { calculateCircle, getTrianglePoints } from "../../model/components/Elements/ArtObject";
import { select } from "../../model/components/Elements/TextElement";

type ArtObjectProps = {
  parentSize: Size;
  element: ArtObjectElement;
  isActive: Boolean;
};

const ArtObjectComponent: FC<ArtObjectProps> = ({parentSize, element, isActive} : ArtObjectProps) => {
  const dispatch = useDispatch();
  const {onMouseDown, position} = useDragAndDrop({element, parentSize, isActive});
  const {onMouseDownResize, resizePosition} = useResize({element, parentSize, isActive});
  const size={width:element.size.width+resizePosition.x, height:element.size.height+resizePosition.y}
  
  const getPrimitiveElement = () => {
    switch (element.artObjectType) {
      case ArtObjectType.RECTANGLE:
        return (<rect onClick={() => dispatch(select(element.elementID))} x={position.x} y={position.y} width={size.width} height={size.height} fill={"green"} style={{
            cursor: "pointer"
          }}/>);
      case ArtObjectType.TRIANGLE:
        return (<polygon onClick={() => dispatch(select(element.elementID))} points={getTrianglePoints(position, size)} fill={"green"} style={{
            cursor: "pointer"
          }}/>);
      case ArtObjectType.CIRCLE:
        {
          const properties = calculateCircle(position, size);
          return (<circle onClick={() => dispatch(select(element.elementID))} cx={properties.cx} cy={properties.cy} r={properties.r} fill={"green"} style={{
              cursor: "pointer"
            }}/>);
        }
    }
  };
  return (
  <>  {
    getPrimitiveElement()
  };
  <Stroke onMouseDown={onMouseDown} isActive={isActive} position={position} size={size}/>
  <ResizeToken onMouseDown={onMouseDownResize} isActive={isActive} position={position} size={size}/>
</>);
};

export default ArtObjectComponent;
