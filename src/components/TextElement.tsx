import React, { FC, useEffect, useState } from 'react'
import { removeText } from '../model/addText'
import {  TextElement } from '../model/Types'
import { dispatch } from '../state/editor'
import MyButton from './button/MyButton'

type ElementProps = {
   element: TextElement 
}
const TextElementComponent: FC<ElementProps> = ({element}: ElementProps) => {
  const [position, setPosition]=useState({x:element.Position.x, y:element.Position.y})
  const [relativePosition, setRelativePosition]=useState({x:0, y:0})
  const [dragging, setDragging]=useState(false)

  useEffect(()=>{
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    return function cleanup() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }   
  }); 
  const remove=(id: String)=>{
    dispatch(removeText, id)
  }
  

  const onMouseDown=(e: any ) => {
    // only left mouse button
    if (e.button !== 0) return   
    setDragging(true)
     setRelativePosition( {
       x: e.pageX - position.x,
       y: e.pageY - position.y
     }
   )
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseMove = (e:any) =>{
    if (!dragging) return
      setPosition({
        x: e.pageX - relativePosition.x,
        y: e.pageY - relativePosition.y   
      }
     )
     e.stopPropagation()
     e.preventDefault()        
  }

  const onMouseUp = (e:any) =>{
    setDragging(false)
    e.stopPropagation()
    e.preventDefault()  
  }
    return (
        <div 
          onMouseDown= {onMouseDown} 
          style={
            {
              position:'absolute', 
              left: position.x+'px', 
              top: position.y+'px',
              background:'lightgray',
              cursor: 'pointer'
            }
            } 
            className="post">
          <div className="post__content">
            <div>
              {element.textContent}
            </div>
          </div>
          <div className="post__btns">
            <MyButton onClick={()=>{remove(element.elementID)}}>Удалить</MyButton>
          </div>
        </div>            
      )
}



export default TextElementComponent
/*

*/