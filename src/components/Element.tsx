import React, { FC } from 'react'
import MyButton from './button/MyButton'
/*interface ElementProps{
  content: string
  element: {
    paddingLeft: string
    paddingTop: string
    number: number
  }
  remove: () => void
}*/
const Element = ({element, remove}:any) => {
    return (
        <div style={{position:'absolute', marginLeft: element.paddingLeft, marginTop: element.paddingTop}} className="post">
          <div className="post__content">
            <div>
              {element.content}
            </div>
          </div>
          <div className="post__btns">
            <MyButton onClick={()=>{remove(element)}}>Удалить</MyButton>
          </div>
        </div>            
      )
}



export default Element
