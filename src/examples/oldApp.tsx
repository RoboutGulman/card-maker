import React, { useState } from 'react';
import './styles/App.css';
import PostList from '../components/ElementList';
import MyButton from '../components/button/MyButton';
import MyInput from '../components/input/MyInput';
import PostForm from '../components/PostForm';

function OldApp() {
  const [posts, setPosts] = useState([
    {id:1, title: 'Javascript', body: 'Description'},
    {id:2, title: 'Python', body: 'Description123'},
    {id:3, title: 'Pascal', body: 'Description321'},
    {id:4, title: 'Dart', body: 'Description567'},
    {id:5, title: 'Javascript', body: 'Description'} 
  ]);

  const createPost = (newPost:any) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post:any) => {
    setPosts(posts.filter(p=> p.id !== post.id))
  }

  return (
    <div className='App'>
     
      <PostForm create = {createPost}/>
      {posts.length!==0
        ? <PostList remove= {removePost} posts={posts} title= 'Список постов 1'/>
        : <h1 style={{textAlign: "center"}}>
          Посты не были найдены!
          </h1>
      }
  
    </div>
  );
}

export default OldApp;
