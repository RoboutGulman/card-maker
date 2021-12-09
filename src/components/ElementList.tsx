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
            width: '800px',
            height:'600px', 
            backgroundColor: 'white', 
            border: '1px lightgray'
          }
          }>
           {elements.map((element: Element, index: number) =>
             <div key={index}>
               {element.type === ElementType.TEXT
                ? <TextElementComponent element={element}/>
                : <div>fdghdgj</div>
               }
             </div>
             )}
        </div>
    )
}

export default ElementList
