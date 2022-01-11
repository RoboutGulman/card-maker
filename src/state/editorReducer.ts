import {
  ElementType,
  CardsHistory,
  Card,
  Element,
  ArtObjectType,
  Size
} from "../model/Types";
import {v4 as uuidv4} from "uuid";
import { defEditor } from "./templates/default";

export enum ActionType {
  ADD_TEXT_ELEMENT,
  ADD_TRIANGLE,
  ADD_CIRCLE,
  ADD_RECTANGLE,
  ADD_IMAGE_ELEMENT,
  CALC_TEXT_SIZE,
  CHANGE_ELEMENT_SIZE,
  CHANGE_SELECTED_ELEMENT_ID,
  CHANGE_CARD_TITLE,
  CHANGE_CARD_SIZE,
  DELETE_ELEMENT,
  EDIT_TEXT_CONTENT,
  LOAD_CARD,
  MOVE_ELEMENT,
  REDO,
  UNDO,
  SAVE_CARD
}

export const STATEFUL_ACTIONS = [
  ActionType.ADD_IMAGE_ELEMENT,
  ActionType.CHANGE_CARD_TITLE,
  ActionType.ADD_TEXT_ELEMENT,
  ActionType.ADD_TRIANGLE,
  ActionType.ADD_CIRCLE,
  ActionType.ADD_RECTANGLE,
  ActionType.MOVE_ELEMENT,
  ActionType.DELETE_ELEMENT,
  ActionType.CHANGE_ELEMENT_SIZE,
  ActionType.EDIT_TEXT_CONTENT,
  ActionType.LOAD_CARD
];

export const editorReducer = (state = defEditor, action : any) => {
  return {
    history: state.history,
    card: card(state.card, state.selectedElementID, action),
    selectedElementID: selectedElementID(state.selectedElementID, action)
  };
};

const selectedElementID = (state : string | null, action : any) => {
  if (action.type === ActionType.CHANGE_SELECTED_ELEMENT_ID) {
    return action.id;
  } else {
    return state;
  }
};
const saveJsonFile = (card : Card) => {
  const element = document.createElement("a");
  const jsonFile = new Blob([JSON.stringify(card, null, 2)], {type: "application/json"});
  element.href = URL.createObjectURL(jsonFile);
  element.download = "userFile.json";
  document.body.appendChild(element);
  element.click();
};
const card = (state : Card, selectedElementID : string | null, action : any) => {
  switch (action.type) {
    case ActionType.SAVE_CARD:
      saveJsonFile(state);
      return state;
    case ActionType.LOAD_CARD:
      return action.card;
    default:
      return {
        title: title(state.title, action),
        size: size(state.size, action),
        backgroundColor: state.backgroundColor,
        elements: elements(state.elements, selectedElementID, action)
      };
  }
};
const size = (state : Size, action : any) => {
  if (action.type === ActionType.CHANGE_CARD_SIZE) 
    return action.size;
  else 
    return state;
};
const elements = (state : Element[], selectedElementID : string | null, action : any) => {
  switch (action.type) {
    case ActionType.ADD_TEXT_ELEMENT:
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
    case ActionType.ADD_IMAGE_ELEMENT:
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
    case ActionType.CHANGE_ELEMENT_SIZE:
    case ActionType.CALC_TEXT_SIZE:
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
    case ActionType.ADD_RECTANGLE:
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
    case ActionType.ADD_TRIANGLE:
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
    case ActionType.ADD_CIRCLE:
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
    case ActionType.DELETE_ELEMENT:
      return state.filter((p) => p.elementID !== selectedElementID);
    case ActionType.MOVE_ELEMENT:
      return state.map((element : Element) => {
        if (element.elementID === action.id) {
          let newElement = Object.assign({}, element);
          newElement.position = action.position;
          return newElement;
        }
        return element;
      });
    case ActionType.EDIT_TEXT_CONTENT:
      return state.map((element : Element) => {
        if (element.elementID === selectedElementID && element.type === ElementType.TEXT) {
          let newElement = Object.assign({}, element);
          newElement.textContent = action.textContent;
          return newElement;
        }
        return element;
      });
    default:
      return state;
  }
};

const title = (state : string, action : any) => {
  if (action.type === ActionType.CHANGE_CARD_TITLE) {
    return action.title;
  } else {
    return state;
  }
};
