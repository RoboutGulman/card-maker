import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Position, Element, Size} from "../model/Types";
import {ActionType} from "../state/editorReducer";

type Resize = {
  element: Element;
  parentSize: Size;
  isActive: Boolean;
};

export default function useResize({element, parentSize, isActive} : Resize) {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [resizePosition, setResizePosition] = useState({x: 0, y:0});
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

  const resize = (id : string, Size : Size) => {
    return {type: ActionType.CHANGE_ELEMENT_SIZE, id: id, Size: Size};
  };

  useEffect(() => {
      console.log("resize")
      console.log(resizePosition)
    if (!dragging&&resizePosition.x!=0&&resizePosition.y!=0) 
    setResizePosition({x:0, y:0});
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
    setResizePosition({x: x, y: y});
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e : any) => {
    if (dragging) 
      dispatch(resize(element.elementID, {
        width: resizePosition.x+element.size.width,
        height: resizePosition.y+element.size.height
      }));
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  return {onMouseDownResize, resizePosition};
}
