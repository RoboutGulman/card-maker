import {Element} from "../../Types";
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