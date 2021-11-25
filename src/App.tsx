import React, {FC} from 'react'
import ElementList from './components/ElementList';
import PostForm from './components/PostForm';
import {Editor} from './model/Types'

type AppProps = {
    editor: Editor;
}

const App: FC<AppProps> = ({editor}: AppProps) => {
    return (
        <div className = 'app'>
            <div><PostForm/> </div>
            <div><ElementList elements={editor.card.elements}/></div>
        </div>
    )
}

export default App
