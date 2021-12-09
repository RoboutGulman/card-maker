import React, {FC} from 'react'
import ElementList from './components/ElementList';
import Menu from './components/Menu/Menu';
import ElementForm from './components/ElementForm';
import {Editor} from './model/Types'
import classes from './App.module.css';

type AppProps = {
    editor: Editor;
}


const bars = [
    {placeholder:"файл", content: ["создать", "открыть", "сохранить", "о программе"],},
    {placeholder:"фильтры", content: ["серый","красный","синий"],},
    {placeholder:"добавить", content: ["текст", "прямоугольник", "треугольник", "круг"],}
]

const App: FC<AppProps> = ({editor}: AppProps) => {
    return (
        <div className = {classes.app}>
            <div className = {classes.title}>{editor.card.title}</div>
            <div className = {classes.border}></div>
            <div><Menu bars = {bars}></Menu></div>
            <div><ElementForm/> </div>
            <div className={classes.workspace}><ElementList elements={editor.card.elements}/></div>
        </div>
    )
}

export default App
/*
*/