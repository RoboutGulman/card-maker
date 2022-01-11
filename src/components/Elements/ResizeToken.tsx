import { FC } from 'react'
import { position, Size } from '../../model/Types';
type StrokeProps = {
    isActive: Boolean;
    position: position;
    size: Size;
    onMouseDown: (e : any) => void;
  };
const tokenSize={
  width: 8,
  height: 8,
  radius: 5
}
const ResizeToken: FC<StrokeProps> = ({onMouseDown, isActive, position, size} : StrokeProps) => {
    return isActive
    ? (<circle 
        cx={position.x+size.width+tokenSize.width} 
        cy={position.y+size.height+tokenSize.height}
        r={tokenSize.radius} 
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
