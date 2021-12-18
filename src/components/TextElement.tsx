import React, {FC, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Size, TextElement} from "../model/Types";
import MyButton from "./UserInterface/button/MyButton";
import useDragAndDrop from "./useDragAndDrop";

export function select(id: string) {
  console.log('select')
  console.log(id)
  return {type: "CHANGE_SELECTED_ELEMENT_ID", id: id}
}

type ElementProps = {
  parentSize: Size;
  element: TextElement;
};
const TextElementComponent: FC<ElementProps> = ({parentSize, element} : ElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<SVGTextElement>(null);

  const dragAndDrop = useDragAndDrop({element, parentSize, ref});

  useEffect(() => {
    document.addEventListener("mousemove", dragAndDrop.onMouseMove);
    document.addEventListener("mouseup", dragAndDrop.onMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", dragAndDrop.onMouseMove);
      document.removeEventListener("mouseup", dragAndDrop.onMouseUp);
    };
  });

  function del(id : string) {
    return {type: "DELETE_ELEMENT", id: id};
  }


  return (<text ref={ref} 
    x={element.Position.x}
    y={element.Position.y}
    dominantBaseline="hanging"
    textAnchor="left"
    onClick={()=>dispatch(select(element.elementID))}
    onMouseDown={dragAndDrop.onMouseDown} style={{
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
