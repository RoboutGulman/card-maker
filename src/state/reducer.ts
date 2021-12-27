import {editorReducer} from './editor';
import undoable from './undoable';

const reducer = undoable(editorReducer);

export default reducer;
export type RootState = ReturnType<typeof reducer>;