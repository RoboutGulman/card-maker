import {FC, useEffect} from "react";
import {Card, Element, ElementType, Size} from "../model/Types";
import ArtObjectComponent from "./Elements/ArtObject";
import TextElementComponent from "./Elements/TextElement";
import ImageComponent from "./Elements/Image";
import { useDispatch } from "react-redux";

type WorkspaceProps = {
  selectedElementID: string;
  size: Size;
  card: Card;
};

export function getElement(elements : Element[], id : string) {
  var selectedElement: Element | undefined;
  selectedElement = elements.find((element:Element)=>{if (element.elementID===id) {return element} else return null})
  if (selectedElement === undefined) 
    return null;
  else 
    return selectedElement;
  }

const Workspace: FC<WorkspaceProps> = ({selectedElementID, card, size} : WorkspaceProps) => {
  var selectedElement=getElement(card.elements,selectedElementID);
  const dispatch = useDispatch()
  
  function saveState(card: Card){
    return {type: "SAVE_STATE", card: card};
  }

  useEffect(()=>{
    dispatch(saveState(card))
  }, [card.elements])

  return (<div style={{
      width: size.width + "px",
      height: size.height + "px",
      backgroundColor: "white",
      border: "1px lightgray"
    }}>
      
    <svg viewBox={`0 0 ${size.width} ${size.height}`}>
      {(selectedElement !== null) ? <rect 
        x={selectedElement.Position.x} y={selectedElement.Position.y} 
        width={selectedElement.size.width} 
        height={selectedElement.size.height} 
        stroke="blue"
        strokeWidth="1"
        fillOpacity="0"
        />:<></>}
      {
        card.elements.map((element : Element) => {
          switch (element.type) {
            case ElementType.TEXT:
              return (<TextElementComponent isActive={element.elementID===selectedElementID} key={element.elementID} element={element} parentSize={size}/>);
            case ElementType.ARTOBJECT:
              return (<ArtObjectComponent isActive={element.elementID===selectedElementID} key={element.elementID} element={element} parentSize={size}/>);
            case ElementType.IMAGE:
              return (<ImageComponent isActive={element.elementID===selectedElementID} key={element.elementID} element={element} parentSize={size}/>)
            default: 
              return <> </>
          }
        })
      }
    </svg>
  </div>);
};

export default Workspace;
/* картинки не через svg возможно */
