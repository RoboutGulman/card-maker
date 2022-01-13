import {useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Element, Size} from "../model/Types";
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
    var y = e.pageY - relativePosition.y;
    if (element.size.width + x <= 0) 
      x = -element.size.width;
    if (element.size.height + y <= 0) 
      y = -element.size.height;
    setResizePosition({x: x, y: y});
    e.preventDefault();
  };
  const onMouseUp = (e : any) => {
    if (dragging) {
      var width = resizePosition.x + element.size.width;
      var height = resizePosition.y + element.size.height;
      if (width < 0) 
        width = 0;
      if (height < 0) 
        height = 0;
      dispatch(resize(element.elementID, width, height));
    }
    setResizePosition({x: 0, y: 0});
    setDragging(false);
    e.preventDefault();
  };

  return {onMouseDownResize, resizePosition};
}
