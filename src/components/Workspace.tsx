import {FC} from "react";
import {Element, ElementType, Size} from "../model/Types";
import TextElementComponent from "./TextElement";

type WorkspaceProps = {
  size: Size;
  elements: Element[];
};

const Workspace: FC<WorkspaceProps> = ({elements, size} : WorkspaceProps) => {
  return (<div  style={{
      position: "relative",
      width: size.width+"px",
      height: size.height+"px",
      backgroundColor: "white",
      border: "1px lightgray"
    }}>
    {
      elements.map((element : Element, index : number) => (<div key={index}>
        {
          element.type === ElementType.TEXT
            ? (<TextElementComponent parentSize={size}  element={element}/>)
            : (<div></div>)
        }
      </div>))
    }
  </div>);
};

export default Workspace;
