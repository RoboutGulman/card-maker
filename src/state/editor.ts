import {
  Editor,
  Color,
  ElementType,
  CardsHistory,
  History,
  Card,
  Element,
  ArtObjectType
} from "../model/Types";
import {createStore} from "redux";
import {v4 as uuidv4} from "uuid";

const editor: Editor = {
  cardsHistory: {
    cards: ["42gwgpe"]
  },
  card: {
    title: "my card",
    cardID: "12grwggr",
    size: {
      height: 600,
      width: 800
    },
    backgroundColor: Color.red,
    elements: [
      {
        type: ElementType.TEXT,
        elementID: "65",
        size: {
          height: 15,
          width: 20
        },
        Position: {
          x: 15,
          y: 20
        },
        textContent: "hello",
        fontSize: 14,
        fontFamily: "Calibri"
      }, {
        type: ElementType.ARTOBJECT,
        elementID: "5",
        size: {
          height: 15,
          width: 20
        },
        Position: {
          x: 44,
          y: 230
        },
        artObjectType: ArtObjectType.CIRCLE
      }, {
        type: ElementType.ARTOBJECT,
        elementID: "85",
        size: {
          height: 15,
          width: 20
        },
        Position: {
          x: 10,
          y: 200
        },
        artObjectType: ArtObjectType.RECTANGLE
      }, {
        type: ElementType.ARTOBJECT,
        elementID: "34",
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
    ]
  },
  selectedElementID: "65",
  history: {
    undoStack: [],
    redoStack: []
  }
};
function undo(editor : Editor): Editor {
  console.log("undo");
  if (editor.history.undoStack.length > 0) {
    const previousHistoryState = editor.history.undoStack[editor.history.undoStack.length - 1];
    console.log(previousHistoryState);
    return {
      ...editor,
      card: previousHistoryState,
      history: {
        undoStack: editor.history.undoStack.slice(0, editor.history.undoStack.length - 1),
        redoStack: [
          editor.card, ...editor.history.redoStack
        ]
      }
    };
  }
  return editor;
}
export function redo(editor : Editor): Editor {
  if (editor.history.redoStack.length > 0) {
    const nextHistoryState = editor.history.redoStack[0];

    return {
      ...editor,
      card: nextHistoryState,
      history: {
        undoStack: [
          ...editor.history.undoStack,
          editor.card
        ],
        redoStack: editor.history.redoStack.slice(1)
      }
    };
  }

  return editor;
}
const STATEFUL_ACTIONS =[
  "ADD_TEXT_ELEMENT",
  "ADD_TRIANGLE",
  "ADD_TEXT_ELEMENT",
  "ADD_CIRCLE",
  "ADD_RECTANGLE",
  "MOVE_ELEMENT",
  "DELETE_ELEMENT",
  "CHANGE_ELEMENT_SIZE"
]
const reducers = (state = editor, action : any) => {
  switch (action.type) {
    case "UNDO":
      return undo(state);
    case "REDO":
      return redo(state);
    default:
      return {
        history: history(state.history, action),
        cardsHistory: cardsHistory(state.cardsHistory, action),
        card: card(state.card, action),
        selectedElementID: selectedElementID(state.selectedElementID, action)
      };
  }
};
const cardsHistory = (state : CardsHistory, action : any) => {
  return state;
};
const selectedElementID = (state : string, action : any) => {
  if (action.type === "CHANGE_SELECTED_ELEMENT_ID") {
    return action.id;
  } else {
    return state;
  }
};
const history = (state : History, action : any) => {
  switch (action.type) {
    case "SAVE_STATE":
      return saveState(state, action);
    default:
      return state;
  }
};
const saveState = (state : History, action : any) => {
  if  (action.card !== state.undoStack[state.undoStack.length - 1])
   {
    console.log("save state");
    return {
      undoStack: [
        ...state.undoStack,
        action.card
      ],
      redoStack: []
    };
  } else 
    return state;
  }
;
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
    case "ADD_IMAGE_ELEMENT":
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
    case "CHANGE_ELEMENT_SIZE":
      return state.map((element : Element) => {
        if (element.elementID === action.id) {
          element.size.height = action.height;
          element.size.width = action.width;
          return element;
        } else 
          return element;
        }
      );
    case "ADD_RECTANGLE":
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
    case "ADD_TRIANGLE":
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
    case "ADD_CIRCLE":
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
    case "DELETE_ELEMENT":
      return state.filter((p) => p.elementID !== action.id);
    case "MOVE_ELEMENT":
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
  if (action.type === "CHANGE_PRESENTATION_TITLE") {
    return action.title;
  } else {
    return state;
  }
};

export const store = createStore(reducers);
