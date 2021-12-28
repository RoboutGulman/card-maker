import React, { FC, useState } from 'react'
import { Position, Size } from '../../model/Types';
type StrokeProps = {
    isActive: Boolean;
    position: Position;
    size: Size;
    onMouseDown: (e : any) => void;
  };
const ResizeToken: FC<StrokeProps> = ({onMouseDown, isActive, position, size} : StrokeProps) => {
    const [selfPosition, setSelfPosition]=useState({x: position.x, y:0});
    return isActive
    ? (<circle 
        cx={position.x+size.width+8} 
        cy={position.y+size.height+8}
        r="5" 
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


export default ResizeToken
