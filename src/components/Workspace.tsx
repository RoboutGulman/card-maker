import {FC} from "react";
import {Card, Element, ElementType, Size} from "../model/Types";
import ArtObjectComponent from "./Elements/ArtObject";
import TextElementComponent from "./Elements/TextElement";
import ImageComponent from "./Elements/Image";
import MyButton from "./UserInterface/MyButton/MyButton";

type WorkspaceProps = {
  selectedElementID: string;
  size: Size;
  card: Card;
};

export function getElement(elements : Element[], id : string) {
  var selectedElement: Element | undefined;
  selectedElement = elements.find((element : Element) => {
    if (element.elementID === id) {
      return element;
    } else 
      return null;
    }
  );
  if (selectedElement === undefined) 
    return null;
  else 
    return selectedElement;
  }

const Workspace: FC<WorkspaceProps> = ({selectedElementID, card, size} : WorkspaceProps) => {
  function save() {
    // Converting SVG to String 
        var stringobJ = new XMLSerializer();
          var svg = document.getElementById('svgcontent');
          if (svg===null) return
          var svgString = stringobJ.serializeToString(svg );
    // IE9 doesn't allow standalone Data URLs
          svgString = '<?xml version="1.0"?>\n' + svgString ; 
    
    // Creating an Image Element
          var image = new Image();
          image.src = 'data:image/svg+xml;base64,' + btoa(svgString);
          image.width = size.width; 
          image.height = size.height; // keep the height proportional

    // Creating Canvas Element 
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');

          image.onload = function() {
            canvas.width = image.width
            canvas.height = image.height
            context?.drawImage(image, 0, 0);
            var a =  document.createElement('a');
            a.download = "image.png"; //Saving in PNG
            a.href = canvas.toDataURL('image/png'); //Saving in PNG
            a.click();
          }
        }
  return (<div>
    <MyButton text="сохранить как" onClick={save}></MyButton>
    <div style={{
        width: size.width + "px",
        height: size.height + "px",
        backgroundColor: "white",
        border: "1px lightgray"
      }}>
      <svg id="svgcontent" viewBox={`0 0 ${size.width} ${size.height}`}>
        {
          card.elements.map((element : Element) => {
            switch (element.type) {
              case ElementType.TEXT:
                return (<TextElementComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={size}/>);
              case ElementType.ARTOBJECT:
                return (<ArtObjectComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={size}/>);
              case ElementType.IMAGE:
                return (<ImageComponent isActive={element.elementID === selectedElementID} key={element.elementID} element={element} parentSize={size}/>);
              default:
                return <> </>;
            }
          })}
      </svg>
    </div>
  </div>);
};

export default Workspace;
