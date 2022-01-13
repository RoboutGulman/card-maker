import {Card, ElementType, Element, ArtObjectType} from "../../Types";
import {v4 as uuidv4} from "uuid";
import {testEditor} from "../../../state/templates/test";

export const saveJsonFile = (card : Card) => {
  const element = document.createElement("a");
  const jsonFile = new Blob([JSON.stringify(card, null, 2)], {type: "application/json"});
  element.href = URL.createObjectURL(jsonFile);
  element.download = card.title + ".json";
  document.body.appendChild(element);
  element.click();
};
export const addTextElement = (state : Element[], action : any) => {
  return state.concat([
    {
      elementID: uuidv4(),
      size: {
        height: 100,
        width: 200
      },
      position: {
        x: 100,
        y: 100
      },
      type: ElementType.TEXT,
      textContent: action.textContent,
      fontSize: 15,
      fontFamily: "serif"
    }
  ]);
};
export const addImageElement = (state : Element[], action : any) => {
  return state.concat([
    {
      elementID: uuidv4(),
      type: ElementType.IMAGE,
      size: action.size,
      position: {
        x: 0,
        y: 0
      },
      source: action.source
    }
  ]);
};
export const changeElementSize = (state : Element[], action : any) => {
  return state.map((element : Element) => {
    if (element.elementID === action.id) {
      let newElement = Object.assign({}, element);
      newElement.size = {
        height: action.height,
        width: action.width
      };
      return newElement;
    } else 
      return element;
    }
  );
};
export const addRectangle = (state : Element[]) => {
  return state.concat([
    {
      elementID: uuidv4(),
      type: ElementType.ARTOBJECT,
      size: {
        height: 15,
        width: 20
      },
      position: {
        x: 10,
        y: 200
      },
      artObjectType: ArtObjectType.RECTANGLE
    }
  ]);
};
export const addTriangle = (state : Element[]) => {
  return state.concat([
    {
      elementID: uuidv4(),
      type: ElementType.ARTOBJECT,
      size: {
        height: 40,
        width: 60
      },
      position: {
        x: 70,
        y: 230
      },
      artObjectType: ArtObjectType.TRIANGLE
    }
  ]);
};
export const addCircle = (state : Element[]) => {
  return state.concat([
    {
      elementID: uuidv4(),
      type: ElementType.ARTOBJECT,
      size: {
        height: 15,
        width: 20
      },
      position: {
        x: 44,
        y: 230
      },
      artObjectType: ArtObjectType.CIRCLE
    }
  ]);
};
export const moveElement = (state : Element[], action : any) => {
  return state.map((element : Element) => {
    if (element.elementID === action.id) {
      let newElement = Object.assign({}, element);
      newElement.position = action.position;
      return newElement;
    }
    return element;
  });
};
export const editTextContent = (state : Element[], action : any, selectedElementID : string | null) => {
  return state.map((element : Element) => {
    if (element.elementID === selectedElementID && element.type === ElementType.TEXT) {
      let newElement = Object.assign({}, element);
      newElement.textContent = action.textContent;
      return newElement;
    }
    return element;
  });
};

export const setTemplate = (action : any) => {
  switch (action.index) {
    case 1:
      return testEditor.card;
  }
};
