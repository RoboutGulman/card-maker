import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {Size, ArtObjectElement, ArtObjectType} from "../../model/Types";
import {select} from "./TextElement";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import Stroke from "./Stroke";
import ResizeToken from "./ResizeToken";
import useResize from "../../customHooks/useResize";

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
  
  function getTrianglePoints(): string {
    const firstPoint = `${position.x},${position.y + size.height}`;
    const secondPoint = `${position.x + size.width / 2},${position.y}`;
    const thirdPoint = `${position.x + size.width},${position.y + size.height}`;
    return `${firstPoint} ${secondPoint} ${thirdPoint}`;
  }

  function calculateCircle() {
    if (size.width < size.height) 
      return {
        cx: position.x + size.width / 2,
        cy: position.y + size.height / 2,
        r: size.width / 2 - 1
      };
    else 
      return {
        cx: position.x + size.width / 2,
        cy: position.y + size.height / 2,
        r: size.height / 2 - 1
      };
  }
  const getPrimitiveElement = () => {
    switch (element.artObjectType) {
      case ArtObjectType.RECTANGLE:
        return (<rect onClick={() => dispatch(select(element.elementID))} x={position.x} y={position.y} width={size.width} height={size.height} fill={"green"} style={{
            cursor: "pointer"
          }}/>);
      case ArtObjectType.TRIANGLE:
        return (<polygon onClick={() => dispatch(select(element.elementID))} points={getTrianglePoints()} fill={"green"} style={{
            cursor: "pointer"
          }}/>);
      case ArtObjectType.CIRCLE:
        {
          const properties = calculateCircle();
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
