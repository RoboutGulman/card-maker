import { Editor, ElementType} from "./Types";
import { uuid } from 'uuidv4';


export function addText(
  editor: Editor,
  param: any
): Editor {
  return{
      ...editor,
      card:{
        ...editor.card,
        elements: 
          editor.card.elements.concat(
          {
            elementID: uuid(),
            size:param.size,
            Position:param.Position,
            type: ElementType.TEXT,
            textContent: param.content,
            fontSize: 10,
            fontFamily: 'Calibri'
        }
        )
      }
  }
}

export function removeText(
  editor: Editor,
  id: String
): Editor {
  return{
      ...editor,
      card:{
        ...editor.card,
        elements: 
          editor.card.elements.filter(p=> p.elementID !== id)
      }
  }
}

