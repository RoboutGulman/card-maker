import React, {FC, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Size, TextElement} from "../../model/Types";
import useDragAndDrop from "../../customHooks/useDragAndDrop";
import { ActionType } from "../../state/editorReducer";
import Stroke from "./Stroke";
import ResizeToken from "./ResizeToken";
import useResize from "../../customHooks/useResize";

export function select(id: string) {
  return {type: ActionType.CHANGE_SELECTED_ELEMENT_ID, id: id}
}

type TextElementProps = {
  parentSize: Size;
  element: TextElement;
  isActive: Boolean;
};
const TextElementComponent: FC<TextElementProps> = ({parentSize, element, isActive} : TextElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<SVGTextElement>(null);
  const {onMouseDown, Position} = useDragAndDrop({element, parentSize, isActive});
  

  function changeSize (id: string, height: number, width: number){
    return {type: ActionType.CALC_TEXT_SIZE, id: id, height:height, width:width};
  }
  
  useEffect(()=>{
    const Rect=ref?.current?.getBoundingClientRect()
    const right=Rect?.right
    const left=Rect?.left
    const bottom=Rect?.bottom
    const top=Rect?.top
    var width=0
    if (right!=null&&left!=null){width=right-left}
    var height=0
    if (bottom!=null&&top!=null){height=bottom-top}
    dispatch(changeSize(element.elementID, height, width))
  }, [element.textContent])

  return (
  <>
     <text ref={ref} 
       x={Position.x}
       y={Position.y}
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
    <Stroke onMouseDown={onMouseDown} isActive={isActive} position={Position} size={element.size}/>
  </>);
};

export default TextElementComponent;

