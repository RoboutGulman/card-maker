import {FC} from "react";
import {Element, ElementType, Size} from "../model/Types";
import ArtObjectComponent from "./ArtObjectComponent";
import TextElementComponent from "./TextElement";

type WorkspaceProps = {
  selectedElementID: string;
  size: Size;
  elements: Element[];
};

export function getSelectedElement(elements : Element[], id : string) {
  var selectedElement: Element | undefined;
  selectedElement = elements.find((element:Element)=>{if (element.elementID===id) return element})
  console.log(id)
  if (selectedElement === undefined) 
    return null;
  else 
    return selectedElement;
  }

const Workspace: FC<WorkspaceProps> = ({selectedElementID, elements, size} : WorkspaceProps) => {
  var selectedElement=getSelectedElement(elements,selectedElementID);
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
        stroke-width="1"
        fill-opacity="0"
        />:<></>}
      {
        elements.map((element : Element) => {
          switch (element.type) {
            case ElementType.TEXT:
              return (<TextElementComponent key={element.elementID} element={element} parentSize={size}/>);
            case ElementType.ARTOBJECT:
              return (<ArtObjectComponent key={element.elementID} element={element} parentSize={size}/>);
          }
        })
      }
    </svg>
  </div>);
};

export default Workspace;
/* картинки не через svg возможно */
