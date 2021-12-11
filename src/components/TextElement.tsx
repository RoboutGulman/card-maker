import React, {FC, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Position, Size, TextElement} from "../model/Types";
import MyButton from "./UserInterface/button/MyButton";
import useDragAndDrop from "./useDragAndDrop";

type ElementProps = {
  parentSize: Size;
  parentLeft: number;
  element: TextElement;
};
const TextElementComponent: FC<ElementProps> = ({parentSize, parentLeft, element} : ElementProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const dragAndDrop = useDragAndDrop({ element, parentSize, ref});

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

  return (<div ref={ref} onMouseDown={dragAndDrop.onMouseDown} style={{
      position: "absolute",
      left: element.Position.x + "px",
      top: element.Position.y + "px",
      background: "lightgray",
      cursor: "pointer"
    }} className="post">
    <div className="post__content">
      <div>{element.textContent}</div>
    </div>
    <div className="post__btns">
      <MyButton onClick={() => {
          dispatch(del(element.elementID));
        }}>
        Удалить
      </MyButton>
    </div>
  </div>);
};

export default TextElementComponent;

/* обернуть драг энд дроп в пользовательский хук
сделать функцию изменения глобальных данных, убрать локальную модель данныхм
remove(element.elementID)
действия 3 видов отноительно истории: те, которые записываются, не запиываются и заменяют предыдущее изменение истории */
