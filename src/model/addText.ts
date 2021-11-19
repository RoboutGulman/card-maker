import { Editor, ElementType, Position, Size} from "./Types";

function generateID(count: Number): String {
  let id: String = '';
  for (let i: number = 0; i < count; i++) {
    id += (((1+Math.random()) * 0X10000)|0).toString(16).substring(1)
  }
  return id
}

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
            elementID: '12',
            size:param.size,
            Position:param.Position,
            type: ElementType.TEXT,
            content: {
                textContent: param.content,
                fontSize: 10,
                fontFamily: 'Calibri'
            }
        }
        )
      }
  }
}

