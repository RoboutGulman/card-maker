import {
  ElementType,
  CardsHistory,
  Card,
  Element,
  ArtObjectType
} from "../model/Types";
import {v4 as uuidv4} from "uuid";
import { editor } from "./template";


export enum ActionType {
  UNDO,
  REDO,
  ADD_TEXT_ELEMENT,
  ADD_TRIANGLE,
  ADD_CIRCLE,
  ADD_RECTANGLE,
  MOVE_ELEMENT,
  DELETE_ELEMENT,
  CHANGE_ELEMENT_SIZE,
  CHANGE_SELECTED_ELEMENT_ID ,
  ADD_IMAGE_ELEMENT,
  CHANGE_CARD_TITLE,
  CALC_TEXT_SIZE
}

export const STATEFUL_ACTIONS =[
  ActionType.ADD_IMAGE_ELEMENT,
  ActionType.CHANGE_CARD_TITLE,
  ActionType.ADD_TEXT_ELEMENT,
  ActionType.ADD_TRIANGLE,
  ActionType.ADD_CIRCLE,
  ActionType.ADD_RECTANGLE,
  ActionType.MOVE_ELEMENT,
  ActionType.DELETE_ELEMENT,
  ActionType.CHANGE_ELEMENT_SIZE
]

export const editorReducer = (state = editor, action : any) => {
      return {
        history:  state.history,
        cardsHistory: cardsHistory(state.cardsHistory, action),
        card: card(state.card, action),
        selectedElementID: selectedElementID(state.selectedElementID, action)
      };
};
const cardsHistory = (state : CardsHistory, action : any) => {
  return state;
};
const selectedElementID = (state : string|null, action : any) => {
  if (action.type === ActionType.CHANGE_SELECTED_ELEMENT_ID) {
    return action.id;
  } else {
    return state;
  }
};

const card = (state : Card, action : any) => {
  return {
    cardID: state.cardID,
    title: title(state.title, action),
    size: state.size,
    backgroundColor: state.backgroundColor,
    elements: elements(state.elements, action)
  };
};
const elements = (state : Element[], action : any) => {
  switch (action.type) {
    case ActionType.ADD_TEXT_ELEMENT:
      return state.concat([
        {
          elementID: uuidv4(),
          size: {
            height: 100,
            width: 200
          },
          Position: {
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
          size: {
            height: 80,
            width: 100
          },
          Position: {
            x: 40,
            y: 150
          },
          source: action.source
        }
      ]);
    case ActionType.CHANGE_ELEMENT_SIZE&&ActionType.CALC_TEXT_SIZE:
      return state.map((element : Element) => {
        if (element.elementID === action.id) {
          element.size.height = action.height;
          element.size.width = action.width;
          return element;
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
          Position: {
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
          Position: {
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
          Position: {
            x: 44,
            y: 230
          },
          artObjectType: ArtObjectType.CIRCLE
        }
      ]);
    case ActionType.DELETE_ELEMENT:
      return state.filter((p) => p.elementID !== action.id);
    case ActionType.MOVE_ELEMENT:
      return state.map((element : Element) => {
        if (element.elementID === action.id) {
          element.Position = action.Position;
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

