import {Editor, Color, ElementType, Position, Size} from '../model/Types';

let editor: Editor = {
  cardsHistory: {
    cards:[
      '42gwgpe'
    ]
    },
    card:{
      title: 'my presentation',
      cardID: '12grwggr',
      size: {
        height:200,
        width:300
      },
      backgroundColor: Color.red,
      elements: [
        {
          elementID:'65',
          size:{
            height: 15,
            width: 20,
          },
          Position: {
            x:15,
            y:20
          },
          type: ElementType.TEXT,
          textContent: 'hello',
          fontSize: 14,
          fontFamily:'Calibri',            
        }
      ],
    },
    selectedElementID:'65',
    history: {
      undoStack:[],
      currentState: -1
    }
}


type HandlerFunc = (() => void) | null;
type ModifyFunc = (editor: Editor, payload: any) => Editor;

let editorChangeHandler: HandlerFunc = null;

  function getEditor(): Editor {
    return editor;
  }
  
  function setEditor(newEditor: Editor): void {
    editor = newEditor;
  }
  
  function addEditorChangeHandler(handler: HandlerFunc): void {
    editorChangeHandler = handler;
  }
  
  function dispatch(modifyFn: ModifyFunc, payload: any): void {
    const newEditor = modifyFn(editor, payload);
    setEditor(newEditor);
  
    if (editorChangeHandler !== null) {
      editorChangeHandler();
    }
  }
  
  export {
    getEditor,
    addEditorChangeHandler,
    dispatch,
  };