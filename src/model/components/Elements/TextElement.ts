import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../state/editorReducer";

function changeSize (id: string, height: number, width: number){
    return {type: ActionType.CALC_TEXT_SIZE, id: id, height:height, width:width};
  }
export function calcTextSize(elementID: string, ref:React.RefObject<SVGTextElement>, dispatch:Dispatch<any>){
  const Rect=ref?.current?.getBoundingClientRect()
  const right=Rect?.right
  const left=Rect?.left
  const bottom=Rect?.bottom
  const top=Rect?.top
  var width=0
  if (right!=null&&left!=null){width=right-left}
  var height=0
  if (bottom!=null&&top!=null){height=bottom-top}
  dispatch(changeSize(elementID, height, width))
  return
}
export function select(id: string) {
    return {type: ActionType.CHANGE_SELECTED_ELEMENT_ID, id: id}
  }