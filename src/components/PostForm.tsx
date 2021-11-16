import React, { useState } from 'react'
import MyButton from './button/MyButton'
import MyInput from './input/MyInput'

const PostForm = ({create}:any) => {
    const[element,setElement]=useState({content:'', paddingLeft:'', paddingTop:''})

    const addNewElement = (e:Event) =>{
        e.preventDefault()
        const newElement = {
            ...element,
            id: Date.now()
        }
        create(newElement)
        setElement({content:'', paddingLeft:'', paddingTop:''})
    }

    return (
        <form>
        <MyInput 
          value={element.content}
          onChange={(e: { target: { value: any; }; }) => setElement({...element, content: e.target.value})}
          type="text" 
          placeholder="Контент"
        />
        <MyInput 
          value={element.paddingLeft}
          onChange={(e: { target: { value: any; }; }) => setElement({...element, paddingLeft: e.target.value})}
          type="text" 
          placeholder="х"
        />
        <MyInput 
          value={element.paddingTop}
          onChange={(e: { target: { value: any; }; }) => setElement({...element, paddingTop: e.target.value})}
          type="text" 
          placeholder="у"
        />        
        <MyButton onClick={addNewElement}>Создать элемент</MyButton>
      </form>
    )
}

export default PostForm
