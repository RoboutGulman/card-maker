import {useEffect} from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {position, Element, Size} from "../model/Types";
import {ActionType} from "../state/editorReducer";

type dragAndDrop = {
  element: Element;
  parentSize: Size;
  isActive: Boolean;
};

export default function useDragAndDrop({element, parentSize, isActive} : dragAndDrop) {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [position, setPosition] = useState({x: element.position.x, y: element.position.y});
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

  const move = (id : string, Pos : position) => {
    return {type: ActionType.MOVE_ELEMENT, id: id, position: Pos};
  };

  useEffect(() => {
    if (!dragging && position !== element.position) 
      setPosition(element.position);
    if (isActive === true) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return function cleanup() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  const onMouseDown = (e : any) => {
    if (e.button !== 0) 
      return;
    setDragging(true);
    setRelativePosition({
      x: e.pageX - element.position.x,
      y: e.pageY - element.position.y
    });
    e.preventDefault();
  };
  const onMouseMove = (e : any) => {
    if (!dragging) 
      return;
    var x = e.pageX - relativePosition.x;
    var y = e.pageY - relativePosition.y;
    setPosition({x: x, y: y});
    e.preventDefault();
  };
  const onMouseUp = (e : any) => {
    if (dragging) 
      dispatch(move(element.elementID, {
        x: position.x,
        y: position.y
      }));
    setDragging(false);
    e.preventDefault();
  };

  return {onMouseDown, position};
}
