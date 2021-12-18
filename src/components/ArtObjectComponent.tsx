import React, {FC, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import {Size, ArtObjectElement, ArtObjectType} from "../model/Types";
import { select } from "./TextElement";
import useDragAndDrop from "./useDragAndDrop";

type ArtObjectProps = {
  parentSize: Size;
  element: ArtObjectElement;
};
export type ArtObject = SVGTextElement | SVGRectElement | SVGPolygonElement | SVGCircleElement;

const ArtObjectComponent: FC<ArtObjectProps> = ({parentSize, element} : ArtObjectProps) => {
  const dispatch = useDispatch();
  const ref = useRef<any>(null);

  const dragAndDrop = useDragAndDrop({element, parentSize, ref});

  useEffect(() => {
    document.addEventListener("mousemove", dragAndDrop.onMouseMove);
    document.addEventListener("mouseup", dragAndDrop.onMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", dragAndDrop.onMouseMove);
      document.removeEventListener("mouseup", dragAndDrop.onMouseUp);
    };
  });

  function getTrianglePoints(element : ArtObjectElement): string {
    const firstPoint = `${element.Position.x},${element.Position.y + element.size.height}`;
    const secondPoint = `${element.Position.x + element.size.width / 2},${
    element.Position.y}`;
    const thirdPoint = `${element.Position.x + element.size.width},${element.Position.y + element.size.height}`;
    return `${firstPoint} ${secondPoint} ${thirdPoint}`;
  }

  function calculateCircle(element : ArtObjectElement) {
    if (element.size.width < element.size.height) 
      return {
        cx: element.Position.x + element.size.width / 2,
        cy: element.Position.y + element.size.height / 2,
        r: element.size.width / 2 - 1
      };
    else 
      return {
        cx: element.Position.x + element.size.width / 2,
        cy: element.Position.y + element.size.height / 2,
        r: element.size.height / 2 - 1
      };
  }
  const getPrimitiveElement = () => {
    switch (element.artObjectType) {
      case ArtObjectType.RECTANGLE:
        return (<rect 
          onMouseDown={dragAndDrop.onMouseDown} 
          onClick={()=>dispatch(select(element.elementID))}
          x={element.Position.x} y={element.Position.y} 
          width={element.size.width} 
          height={element.size.height} 
          fill={"green"} 
          ref={ref}
          style={{cursor: "pointer"}}
        />);
      case ArtObjectType.TRIANGLE:
        return (<polygon 
          onMouseDown={dragAndDrop.onMouseDown}
          onClick={()=>dispatch(select(element.elementID))}
          points={getTrianglePoints(element)} 
          fill={"green"} 
          ref={ref}
          style={{cursor: "pointer" }}
        />);
      case ArtObjectType.CIRCLE:
        {
          const properties = calculateCircle(element);
          return (<circle 
            onMouseDown={dragAndDrop.onMouseDown}
            onClick={()=>dispatch(select(element.elementID))} 
            cx={properties.cx} 
            cy={properties.cy} 
            r={properties.r} 
            fill={"green"} 
            ref={ref}
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
function dispatch(arg0: any): void {
  throw new Error("Function not implemented.");
}

