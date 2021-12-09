import React, { useState } from 'react'
import MyButton from './button/MyButton'
import MyInput from './input/MyInput'
import {addText} from '../model/Text'

const ElementForm = () => {
    const[element,setElement]=useState({content:'', Left:'', Top:''})
    let param: any;



    const addNewElement = (e:Event) => {
        e.preventDefault()
        let x=Number(element.Left)
        let y=Number(element.Top)
        let width=200;
        let height=100;
        param = {Position:{x, y}, size: {width, height}, content:element.content}
        setElement({content:'', Left:'', Top:''})
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
          value={element.Left}
          onChange={(e: { target: { value: any; }; }) => setElement({...element, Left: e.target.value})}
          type="text" 
          placeholder="х"
        />
        <MyInput 
          value={element.Top}
          onChange={(e: { target: { value: any; }; }) => setElement({...element, Top: e.target.value})}
          type="text" 
          placeholder="у"
        />        
        <MyButton onClick={addNewElement}>Создать элемент</MyButton>
      </form>
    )
}

export default ElementForm
