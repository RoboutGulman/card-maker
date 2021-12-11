import React, {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Position, TextElement} from "../model/Types";
import MyButton from "./button/MyButton";

type ElementProps = {
  element: TextElement;
};
const TextElementComponent: FC<ElementProps> = ({element} : ElementProps) => {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  const onMouseDown = (e : any) => {
    // only left mouse button
    if (e.button !== 0) 
      return;
    setDragging(true);
    setRelativePosition({
      x: e.pageX - element.Position.x,
      y: e.pageY - element.Position.y
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e : any) => {
    if (!dragging) 
      return;
    const x = e.pageX - relativePosition.x;
    const y = e.pageY - relativePosition.y;
    dispatch(move(element.elementID, {
      x: x,
      y: y
    }));
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e : any) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };
  const dispatch = useDispatch();
  function del(id : string) {
    return {type: "DELETE_ELEMENT", id: id};
  }
  function move(id : string, Pos : Position) {
    return {type: "MOVE_ELEMENT", id: id, Position: Pos};
  }
  return (<div onMouseDown={onMouseDown} style={{
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
действия 3 видов отноительно истории: те, которые записываются, не запиываются и заменяют предыдущее изменение истории*/
