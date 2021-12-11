import {useState} from "react";
import {useDispatch} from "react-redux";
import {Position, Element, Size} from "../model/Types";

type dragAndDrop = {
  element: Element;
  parentSize: Size;
  ref: React.RefObject<HTMLDivElement>
};

export default function useDragAndDrop({ref, element, parentSize} : dragAndDrop) {
  const [relativePosition, setRelativePosition] = useState({x: 0, y: 0});
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const Rect=ref?.current?.getBoundingClientRect()
  const right=Rect?.right
  const left=Rect?.left
  const bottom=Rect?.bottom
  const top=Rect?.top
  var width=0
  if (right!=null&&left!=null){width=right-left}
  var height=0
  if (bottom!=null&&top!=null){height=bottom-top}

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
    if (x + width > parentSize.width) {
      x = parentSize.width - width;
    }
    var y = e.pageY - relativePosition.y;
    if (y < 0) {
      y = 0;
    }
    if (y + height > parentSize.height) {
      y = parentSize.height - height;
    }
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
  const move = (id : string, Pos : Position) => {
    return {type: "MOVE_ELEMENT", id: id, Position: Pos};
  };
  return {onMouseDown, onMouseMove, onMouseUp};
}
