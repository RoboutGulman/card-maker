import {
  Editor,
  Color,
  ElementType,
  CardsHistory,
  History,
  Card,
  Element
} from "../model/Types";
import {createStore} from "redux";
import ElementList from "../components/ElementList";
import {uuid} from "uuidv4";

const editor: Editor = {
  cardsHistory: {
    cards: ["42gwgpe"]
  },
  card: {
    title: "my card",
    cardID: "12grwggr",
    size: {
      height: 200,
      width: 300
    },
    backgroundColor: Color.red,
    elements: [
      {
        elementID: "65",
        size: {
          height: 15,
          width: 20
        },
        Position: {
          x: 15,
          y: 20
        },
        type: ElementType.TEXT,
        textContent: "hello",
        fontSize: 14,
        fontFamily: "Calibri"
      }
    ]
  },
  selectedElementID: "65",
  history: {
    undoStack: [],
    currentState: -1
  }
};
const action = {
  type: "",
  payload: "?"
};

const reducers = (state = editor, action : any) => {
  return {
    cardsHistory: cardsHistory(state.cardsHistory, action),
    card: card(state.card, action),
    selectedElementID: selectedElementID(state.selectedElementID, action),
    history: history(state.history, action)
  };
};
const cardsHistory = (state : CardsHistory, action : any) => {
  return state;
};
const selectedElementID = (state : string, action : any) => {
  return state;
};
const history = (state : History, action : any) => {
  return state;
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
    case "ADD_TEXT_ELEMENT":
      return state.concat([
        {
          elementID: uuid(),
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
          fontSize: 10,
          fontFamily: ""
        }
      ]);
    case "DELETE_ELEMENT":
      return state.filter((p) => p.elementID != action.id);
    case "MOVE_ELEMENT":
      return state.map((element : Element) => {
        if (element.elementID === action.id) {
          element.Position = action.Position
        }
        return element
      });
    default:
      return state;
  }
};

const title = (state : string, action : any) => {
  if (action.type === "CHANGE_PRESENTATION_TITLE") {
    return action.title;
  } else {
    return state;
  }
};

export const store = createStore(reducers);
