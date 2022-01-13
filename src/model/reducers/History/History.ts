import {Editor} from "../../Types";
const MAX_HISTORY_SIZE = 50;

export function undo(editor : Editor): Editor {
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
export function saveState(editor : Editor, newEditor : Editor): Editor {
  if (editor.card !== newEditor.card) {
    return {
      ...newEditor,
      history: {
        undoStack: newEditor.history.undoStack.length < MAX_HISTORY_SIZE
          ? [
            ...newEditor.history.undoStack,
            editor.card
          ]
          : [
            ...newEditor.history.undoStack.slice(1),
            editor.card
          ],
        redoStack: []
      }
    };
  }

  return newEditor;
}
