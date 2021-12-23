import React, {FC, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Size, TextElement} from "../../model/Types";
import useDragAndDrop from "../../customHooks/useDragAndDrop";

export function select(id: string) {
  return {type: "CHANGE_SELECTED_ELEMENT_ID", id: id}
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
    return {type: "CHANGE_ELEMENT_SIZE", id: id, height:height, width:width};
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


  function del(id : string) {
    return {type: "DELETE_ELEMENT", id: id};
  }


  return (<text ref={ref} 
    x={Position.x}
    y={Position.y}
    dominantBaseline="hanging"
    textAnchor="left"
    onClick={()=>dispatch(select(element.elementID))}
    onMouseDown={isActive?onMouseDown:()=>{}} style={{
      fontFamily: element.fontFamily,
      fontSize: element.fontSize,
      cursor: "pointer",
      userSelect: 'none'
    }} className="post">
      {element.textContent}
  </text>);
};

export default TextElementComponent;

/* обернуть драг энд дроп в пользовательский хук
сделать функцию изменения глобальных данных, убрать локальную модель данныхм
remove(element.elementID)
действия 3 видов отноительно истории: те, которые записываются, не запиываются и заменяют предыдущее изменение истории
multiline text tspan */
