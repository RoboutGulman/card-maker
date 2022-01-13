import { editorReducer} from './editorReducer';
import { Editor } from  '../model/Types';
import { ActionType, STATEFUL_ACTIONS } from './editorReducer';
import { defEditor } from './templates/default';
import { redo, saveState, undo } from '../model/reducers/History/History';

function historyReducer(reducer: typeof editorReducer): typeof editorReducer {
  return function (state = defEditor, action: any): Editor {
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