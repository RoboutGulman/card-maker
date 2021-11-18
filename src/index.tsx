import React from 'react';
import ReactDOM from 'react-dom';
//import {getEditor} from './state/editor';
import App from './examples/oldApp';
import Editor from './components/Editor';

ReactDOM.render(
//  <React.StrictMode>
//    <App editor={getEditor()} />
//  </React.StrictMode>
  <Editor/>,
 // <React.StrictMode>
 //   <App />
 // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
