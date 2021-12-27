import React, { useEffect } from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Position, Element, Size} from "../model/Types";

type dragAndDrop = {
  element: Element;
  parentSize: Size;
  isActive: Boolean
};

export default function useDragAndDrop({element, parentSize, isActive} : dragAndDrop) {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [Position, setPosition] = useState({x: element.Position.x, y:  element.Position.y});
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

  const move = (id : string, Pos : Position) => {
    return {type: "MOVE_ELEMENT", id: id, Position: Pos};
  };

  useEffect(() => {
    if (isActive === true)
    {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    }
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
    var x = e.pageX - relativePosition.x;
    if (x < 0) {
      x = 0;
    }
    if (x + element.size.width > parentSize.width) {
      x = parentSize.width - element.size.width;
    }
    var y = e.pageY - relativePosition.y;
    if (y < 0) {
      y = 0;
    }
    if (y + element.size.height > parentSize.height) {
      y = parentSize.height - element.size.height;
    }
    setPosition({x:x,y:y})
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e : any) => {
    if(dragging)
    dispatch(move(element.elementID, {
      x: Position.x,
      y: Position.y
    }));
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  return {onMouseDown, Position};
}
