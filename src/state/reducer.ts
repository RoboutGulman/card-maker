import {editorReducer} from './editorReducer';
import historyReducer from './historyReducer';

const reducer = historyReducer(editorReducer);

export default reducer;
export type RootState = ReturnType<typeof reducer>;