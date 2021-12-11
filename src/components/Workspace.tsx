import {FC, useRef} from "react";
import {Element, ElementType, Size} from "../model/Types";
import TextElementComponent from "./TextElement";

type WorkspaceProps = {
  size: Size;
  elements: Element[];
};

const Workspace: FC<WorkspaceProps> = ({elements, size} : WorkspaceProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const left = ref?.current?.getBoundingClientRect().left
  return (<div ref={ref} style={{
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
            ? (<TextElementComponent parentSize={size} parentLeft={left == null? 0 : left} element={element}/>)
            : (<div></div>)
        }
      </div>))
    }
  </div>);
};

export default Workspace;
