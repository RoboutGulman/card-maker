import React, {FC} from 'react'
import ElementList from './components/ElementList';
import PostForm from './components/PostForm';
import {Editor} from './model/Types'

type AppProps = {
    editor: Editor;
}

const App: FC<AppProps> = ({editor}: AppProps) => {
    console.log(editor);
    return (
        <div className = 'app'>
            <div><PostForm editor={editor} /> </div>
            <div><ElementList elements={editor.card.elements}/></div>
        </div>
    )
}

export default App
