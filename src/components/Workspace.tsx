import {FC} from "react";
import {Element, ElementType, Size} from "../model/Types";
import ArtObjectComponent from "./ArtObjectComponent";
import TextElementComponent from "./TextElement";

type WorkspaceProps = {
  size: Size;
  elements: Element[];
};

const Workspace: FC<WorkspaceProps> = ({elements, size} : WorkspaceProps) => {
  return (<div style={{
      width: size.width + "px",
      height: size.height + "px",
      backgroundColor: "white",
      border: "1px lightgray"
    }}>
    <svg viewBox={`0 0 ${size.width} ${size.height}`}>
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
