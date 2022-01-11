import React, {FC, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Size, TextElement} from "../../model/Types";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import Stroke from "./Stroke";
import { calcTextSize, select } from "../../model/components/Elements/TextElement";

type TextElementProps = {
  parentSize: Size;
  element: TextElement;
  isActive: Boolean;
};

const TextElementComponent: FC<TextElementProps> = ({parentSize, element, isActive} : TextElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<SVGTextElement>(null);
  const {onMouseDown, position} = useDragAndDrop({element, parentSize, isActive});

  useEffect(()=>{
    calcTextSize(element.elementID, ref, dispatch)
  }, [element.textContent])

  return (
  <>
     <text ref={ref} 
       x={position.x}
       y={position.y}
       dominantBaseline="hanging"
       textAnchor="left"
       onClick={()=>dispatch(select(element.elementID))}
       style={{
         fontFamily: element.fontFamily,
         fontSize: element.fontSize,
         cursor: "pointer",
         userSelect: 'none'
       }} className="post">
      {element.textContent}
    </text>
    <Stroke onMouseDown={onMouseDown} isActive={isActive} position={position} size={element.size}/>
  </>);
};

export default TextElementComponent;

