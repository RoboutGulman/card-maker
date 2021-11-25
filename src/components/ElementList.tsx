import { FC } from 'react'
import { Element, ElementType } from '../model/Types'
import TextElementComponent from './TextElement'

type ElementListProps ={
  elements: Element[];
}

const ElementList: FC<ElementListProps> = ({elements}: ElementListProps) => {
    return (
        <div style={
          {
            position:'relative', 
            width: '400px',
            height:'100px', 
            backgroundColor: 'red', 
            border: '1px lightgray'
          }
          }>
           {elements.map((element: Element, index: number) =>
             <div>
               {element.type == ElementType.TEXT
                ? <TextElementComponent element={element} key={index}/>
                : <div>fdghdgj</div>
               }
             </div>
             )}
        </div>
    )
}

export default ElementList
