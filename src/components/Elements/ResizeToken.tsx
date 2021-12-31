import { FC } from 'react'
import { Position, Size } from '../../model/Types';
type StrokeProps = {
    isActive: Boolean;
    position: Position;
    size: Size;
    onMouseDown: (e : any) => void;
  };
const tokenSize={
  width:8,
  height:8
}
const ResizeToken: FC<StrokeProps> = ({onMouseDown, isActive, position, size} : StrokeProps) => {
    return isActive
    ? (<circle 
        cx={position.x+size.width+tokenSize.width} 
        cy={position.y+size.height+tokenSize.height}
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
