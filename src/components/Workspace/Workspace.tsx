import {FC, useState} from "react";
import {Card, Element, ElementType, Size} from "../../model/Types";
import ArtObjectComponent from "../Elements/ArtObject";
import TextElementComponent from "../Elements/TextElement";
import ImageComponent from "../Elements/Image";
import MyButton from "../UserInterface/MyButton/MyButton";
import Modal from "../UserInterface/Modal/Modal";

type WorkspaceProps = {
  selectedElementID: string;
  card: Card;
};
export function save(size: Size) {
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

const Workspace: FC<WorkspaceProps> = ({selectedElementID, card} : WorkspaceProps) => {
  const [modalAcive, setModalAcive] = useState(false)
  return (<div>
    <MyButton text="сохранить как" onClick={()=>save(card.size)}></MyButton>
    <MyButton text="открыть модальное окно" onClick={()=>{setModalAcive(true)}}></MyButton>
    <Modal active={modalAcive} setActive={setModalAcive}> <p>1gmermer;gmrpgremg</p></Modal>
    <div style={{
        width: card.size.width + "px",
        height: card.size.height + "px",
        backgroundColor: "white",
        border: "1px lightgray"
      }}>
      <svg id="svgcontent" viewBox={`0 0 ${card.size.width} ${card.size.height}`}>
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
