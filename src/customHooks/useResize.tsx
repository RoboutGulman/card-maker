import React, {RefObject, useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { isConstructorDeclaration } from "typescript";
import {Position, Element, Size} from "../model/Types";
import {ActionType} from "../state/editorReducer";

type Resize = {
  element: Element;
  parentSize: Size;
  isActive: Boolean;
};
export const resize = (id : string, width : number, height : number) => {
  return {type: ActionType.CHANGE_ELEMENT_SIZE, id: id, height: height, width: width};
};

export default function useResize({element, parentSize, isActive} : Resize) {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [resizePosition, setResizePosition] = useState({x: 0, y: 0});
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //if (!dragging && resizePosition.x != 0 && resizePosition.y != 0) 
    //  setResizePosition({x: 0, y: 0});
    if (isActive === true) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  const onMouseDownResize = (e : any) => {
    // only left mouse button
    if (e.button !== 0) 
      return;
    setDragging(true);
    setRelativePosition({x: e.pageX, y: e.pageY});
    e.preventDefault();
  };
  const onMouseMove = (e : any) => {
    if (!dragging) 
      return;
    var x = e.pageX - relativePosition.x;    
    if (x + 5 > parentSize.width) {
      x = parentSize.width - 5;
    }
    var y = e.pageY - relativePosition.y;
    if (y + 5 > parentSize.height) {
      y = parentSize.height - 5;
    }
    setResizePosition({x: x, y: y});
    e.preventDefault();
  };
  const onMouseUp = (e : any) => {
    if (dragging) {
      const width = resizePosition.x + element.size.width;
      const height = resizePosition.y + element.size.height;
      dispatch(resize(element.elementID, width, height));
    }
    setResizePosition({x: 0, y: 0});
    setDragging(false);
    e.preventDefault();
  };

  return {onMouseDownResize, resizePosition};
}
