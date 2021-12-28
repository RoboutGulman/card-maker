import React from "react";
import Menu from "../components/UserInterface/Menu/Menu";
import classes from "./Editor.module.css";
import {connect} from "react-redux";
import Workspace from "../components/Workspace";
import { ActionType } from "../state/editorReducer";



const Editor = ({editor} : any) => {
  return (<div className={classes.app}>
    <div className={classes.title}>{editor.card.title}</div>
    <div className={classes.border}></div>
    <div>
      <Menu></Menu>
    </div>
    <div className={classes.border}></div>
    <div className={classes.workspace}>
      <Workspace selectedElementID={editor.selectedElementID} size={editor.card.size} card={editor.card}/>
    </div>
  </div>);
};

function mapStateToProps(state : any) {
  return {editor: state};
}

export default connect(mapStateToProps)(Editor);
/* bars можно не перерисовывать, то есть изменить тут connect
брать элементы из стейта уже в elements(если это так работает)
elementForm и text.ts можно удалять */
