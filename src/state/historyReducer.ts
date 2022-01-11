import { editorReducer} from './editorReducer';
import { Card, Editor } from  '../model/Types';
import { ActionType, STATEFUL_ACTIONS } from './editorReducer';
import { editor } from './templates/template';

function historyReducer(reducer: typeof editorReducer): typeof editorReducer {
  function createEditor(card: Card): Editor {
    return {
      card,
      history: {
        undoStack: [],
        redoStack: [],
      },
      selectedElementID: null,
    };
  }
  function createNewCard(): Card {
    return editor.card;
  }
  const initialState = createEditor(createNewCard());
  function undo(editor : Editor): Editor {
    if (editor.history.undoStack.length > 0) {
      const previousHistoryState = editor.history.undoStack[editor.history.undoStack.length - 1];
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
  function redo(editor : Editor): Editor {
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
   function saveState(editor: Editor, newEditor: Editor): Editor {
    if (editor.card !== newEditor.card) {
      return {
        ...newEditor,
        history: {
          undoStack: newEditor.history.undoStack.length < 50
            ? [...newEditor.history.undoStack, editor.card]
            : [...newEditor.history.undoStack.slice(1), editor.card],
          redoStack: [],
        },
      };
    }
  
    return newEditor;
  }
  return function (state = editor, action: any): Editor {
    switch (action.type) {
    case ActionType.UNDO:
      return undo(state);
    case ActionType.REDO:
      return redo(state);
    default: {
      const newEditor = reducer(state, action);
      if (STATEFUL_ACTIONS.includes(action.type)) {
        return saveState(state, newEditor);
      }
      return newEditor;
    }
    }
  };
}

export default historyReducer;