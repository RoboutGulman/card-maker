import React, {FC} from 'react'
import DropDown from './components/Dropdown/Dropdown';
import ElementList from './components/ElementList';
import Menu from './components/Menu/Menu';
import PostForm from './components/PostForm';
import {Editor} from './model/Types'

type AppProps = {
    editor: Editor;
}


const bars = [
    {placeholder:"файл", content: ["создать", "открыть", "сохранить", "о программе"],},
    {placeholder:"фильтры", content: ["серый","красный","синий"],},
    {placeholder:"select a type", content: ["breakfast", "lunch", "dinner", "Snacks"],}
]

const App: FC<AppProps> = ({editor}: AppProps) => {
    return (
        <div className = 'app'>
            <div><Menu bars = {bars}></Menu></div>
            <div><PostForm/> </div>
            <div><ElementList elements={editor.card.elements}/></div>
        
        </div>
    )
}

export default App
