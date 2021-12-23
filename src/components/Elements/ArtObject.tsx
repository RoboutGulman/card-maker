import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {Size, ArtObjectElement, ArtObjectType} from "../../model/Types";
import { select } from "./TextElement";
import useDragAndDrop from "../../customHooks/useDragAndDrop";

type ArtObjectProps = {
  parentSize: Size;
  element: ArtObjectElement;
  isActive: Boolean;
};

const ArtObjectComponent: FC<ArtObjectProps> = ({parentSize, element, isActive} : ArtObjectProps) => {
  const dispatch = useDispatch();
  const {onMouseDown, Position} = useDragAndDrop({element, parentSize, isActive});


  function getTrianglePoints(element : ArtObjectElement): string {
    const firstPoint = `${Position.x},${Position.y + element.size.height}`;
    const secondPoint = `${Position.x + element.size.width / 2},${
    Position.y}`;
    const thirdPoint = `${Position.x + element.size.width},${Position.y + element.size.height}`;
    return `${firstPoint} ${secondPoint} ${thirdPoint}`;
  }

  function calculateCircle(element : ArtObjectElement) {
    if (element.size.width < element.size.height) 
      return {
        cx: Position.x + element.size.width / 2,
        cy: Position.y + element.size.height / 2,
        r: element.size.width / 2 - 1
      };
    else 
      return {
        cx: Position.x + element.size.width / 2,
        cy: Position.y + element.size.height / 2,
        r: element.size.height / 2 - 1
      };
  }
  const getPrimitiveElement = () => {
    switch (element.artObjectType) {
      case ArtObjectType.RECTANGLE:
        return (<rect 
          onMouseDown={isActive?onMouseDown:()=>{}}
          onClick={()=>dispatch(select(element.elementID))}
          x={Position.x} y={Position.y} 
          width={element.size.width} 
          height={element.size.height} 
          fill={"green"} 
          style={{cursor: "pointer"}}
        />);
      case ArtObjectType.TRIANGLE:
        return (<polygon 
          onMouseDown={isActive?onMouseDown:()=>{}}
          onClick={()=>dispatch(select(element.elementID))}
          points={getTrianglePoints(element)} 
          fill={"green"} 
          style={{cursor: "pointer" }}
        />);
      case ArtObjectType.CIRCLE:
        {
          const properties = calculateCircle(element);
          return (<circle 
            onMouseDown={isActive?onMouseDown:()=>{}}
            onClick={()=>dispatch(select(element.elementID))} 
            cx={properties.cx} 
            cy={properties.cy} 
            r={properties.r} 
            fill={"green"} 
            style={{cursor: "pointer"}}
          />);
        }
    }
  };
  return <> {
    getPrimitiveElement()
  };
  </>;
};

export default ArtObjectComponent;

