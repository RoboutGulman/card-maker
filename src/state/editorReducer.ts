import {Card, Element, Size} from "../model/Types";
import {defEditor} from "./templates/default";
import {
  addCircle,
  addImageElement,
  addRectangle,
  addTextElement,
  addTriangle,
  changeElementSize,
  editTextContent,
  moveElement,
  saveJsonFile,
  setTemplate
} from "../model/Editor/Editor";

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
  SAVE_CARD,
  NEW_CARD,
  SET_TEMPLATE
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
  ActionType.LOAD_CARD,
  ActionType.NEW_CARD,
  ActionType.SET_TEMPLATE
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

const card = (state : Card, selectedElementID : string | null, action : any) => {
  switch (action.type) {
    case ActionType.SET_TEMPLATE:
      return setTemplate(action);
    case ActionType.SAVE_CARD:
      saveJsonFile(state);
      return state;
    case ActionType.LOAD_CARD:
      return action.card;
    case ActionType.NEW_CARD:
      return defEditor.card;
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
  }
;
const elements = (state : Element[], selectedElementID : string | null, action : any) => {
  switch (action.type) {
    case ActionType.ADD_TEXT_ELEMENT:
      return addTextElement(state, action);
    case ActionType.ADD_IMAGE_ELEMENT:
      return addImageElement(state, action);
    case ActionType.CHANGE_ELEMENT_SIZE:
    case ActionType.CALC_TEXT_SIZE:
      return changeElementSize(state, action);
    case ActionType.ADD_RECTANGLE:
      return addRectangle(state);
    case ActionType.ADD_TRIANGLE:
      return addTriangle(state);
    case ActionType.ADD_CIRCLE:
      return addCircle(state);
    case ActionType.DELETE_ELEMENT:
      return state.filter((p) => p.elementID !== selectedElementID);
    case ActionType.MOVE_ELEMENT:
      return moveElement(state, action);
    case ActionType.EDIT_TEXT_CONTENT:
      return editTextContent(state, action, selectedElementID);
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
