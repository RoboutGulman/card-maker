import {FC} from "react";
import {Card, Element, ElementType} from "../../model/Types";
import ArtObjectComponent from "../Elements/ArtObject";
import TextElementComponent from "../Elements/TextElement";
import ImageComponent from "../Elements/Image";

type WorkspaceProps = {
  selectedElementID: string;
  card: Card;
};

const Workspace: FC<WorkspaceProps> = ({selectedElementID, card} : WorkspaceProps) => {
  return (<div>
    <div style={{
        width: card.size.width + "px",
        height: card.size.height + "px",
      }}>
      <svg id="svgcontent" style={{backgroundColor: `${card.backgroundColor}`}} viewBox={`0 0 ${card.size.width} ${card.size.height}`} >
        {
          card.elements.map((element : Element) => {
            switch (element.type) {
              case ElementType.TEXT:
                return (<TextElementComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={card.size}/>);
              case ElementType.ARTOBJECT:
                return (<ArtObjectComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={card.size}/>);
              case ElementType.IMAGE:
                return (<ImageComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={card.size}/>);
              default:
                return <> </>;
            }
          })}
      </svg>
    </div>
  </div>);
};

export default Workspace;
