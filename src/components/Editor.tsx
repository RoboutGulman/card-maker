import React, { useState } from 'react'
import Card from './Card'
import PostForm from './PostForm';
import PostList from './PostList';

const Editor = () => {
    const [elements, setElements] = useState([
        {id:1, content: 'Javascript', paddingLeft: '15px',paddingTop:'50px'},
        {id:2, content: 'Python', paddingLeft: '30px', paddingTop:'40px'},
      ]);
      const createElement = (newElement:any) => {
        setElements([...elements, newElement])
      }
    
      const removeElement = (element:any) => {
        setElements(elements.filter(p=> p.id !== element.id))
      }
    return (
        <div>
            <PostForm create = {createElement}/> 

            <PostList remove= {removeElement} elements={elements} title= 'Список постов 1'/>
        </div>
    )
}

export default Editor

