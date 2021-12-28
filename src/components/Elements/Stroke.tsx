import React, {FC} from "react";
import {Position, Size} from "../../model/Types";
type StrokeProps = {
  isActive: Boolean;
  position: Position;
  size: Size;
  onMouseDown: (e : any) => void;
};
const Stroke: FC<StrokeProps> = ({onMouseDown, isActive, position, size} : StrokeProps) => {
  return isActive
    ? (<rect 
        x={position.x} 
        y={position.y} 
        width={size.width} 
        height={size.height} 
        stroke="blue" 
        strokeWidth="1" 
        fillOpacity="0" 
        onMouseDown={isActive
          ? onMouseDown
          : () => {}
        } 
        style={{
          cursor: "pointer"
        }}
      />)
    : (<></>);
};

export default Stroke;
