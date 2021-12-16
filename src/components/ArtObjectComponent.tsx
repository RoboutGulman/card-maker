import React, {FC, useRef} from "react";
import {Size, ArtObjectElement, ArtObjectType} from "../model/Types";

type ArtObjectProps = {
  parentSize: Size;
  element: ArtObjectElement;
};

const ArtObjectComponent: FC<ArtObjectProps> = ({parentSize, element} : ArtObjectProps) => {
  const ref = useRef(null);
  function getTrianglePoints(element : ArtObjectElement): string {
    const firstPoint = `${element.Position.x},${element.Position.y + element.size.height}`;
    const secondPoint = `${element.Position.x + element.size.width / 2},${
    element.Position.y}`;
    const thirdPoint = `${element.Position.x + element.size.width},${element.Position.y + element.size.height}`;
    return `${firstPoint} ${secondPoint} ${thirdPoint}`;
  }
  function calculateCircle(element : ArtObjectElement) {
    if (element.Position.x < element.Position.y) 
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
        return (<rect x={element.Position.x} y={element.Position.y} width={element.size.width} height={element.size.height} fill={"green"} ref={ref}/>);
      case ArtObjectType.TRIANGLE:
        return (<polygon points={getTrianglePoints(element)} fill={"green"} ref={ref}/>);
      case ArtObjectType.CIRCLE:
        {
          const properties = calculateCircle(element);

          return (<circle cx={properties.cx} cy={properties.cy} r={properties.r} fill={"green"} ref={ref}/>);
        }
    }
  };
  return( <>
    {getPrimitiveElement()};    </>
  );
};

export default ArtObjectComponent;
