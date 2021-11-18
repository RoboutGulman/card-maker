import React, { useState } from 'react'
import PostForm from './PostForm';
import PostList from './PostList';

const Editor = () => {
    const [elements, setElements] = useState([
        /*{id:1, content: 'Javascript', paddingLeft: 15, paddingTop: 50},*/
        {id:2, content: 'Python', paddingLeft: 35, paddingTop:40},
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

