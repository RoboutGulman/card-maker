import React from "react";
import Menu from "../components/UserInterface/Menu/Menu";
import classes from "./Editor.module.css";
import {connect} from "react-redux";
import Workspace from "../components/Workspace";
import { SelectImageButton } from "../customHooks/useImageLoader";

function addText(textContent : string) {
  return {type: "ADD_TEXT_ELEMENT", textContent: textContent};
}

const bars = [
  {
    placeholder: "файл",
    content: [
      {
        title: "создать",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "открыть",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "сохранить",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "о программе",
        func: () => {return {type: "UNDEFINED"}}
      }
    ]
  }, {
    placeholder: "фильтры",
    content: [
      {
        title: "серый",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "красный",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "синий",
        func: () => {return {type: "UNDEFINED"}}
      }
    ]
  }, {
    placeholder: "добавить",
    content: [
      {
        title: "текст",
        func: () => {
          const x = prompt();
          return addText(
            x == null
            ? ""
            : x);
        }
      }, {
        title: "прямоугольник",
        func: () => {return {type: "ADD_RECTANGLE"}}
      }, {
        title: "треугольник",
        func: () => {return {type: "ADD_TRIANGLE"}}
      }, {
        title: "круг",
        func: () => {return {type: "ADD_CIRCLE"}}
      }, {
        title: "картинка",
        func: () => {return {type: "ADD_CIRCLE"}}
      }
    ]
  }
];

const Editor = ({editor} : any) => {
  return (<div className={classes.app}>
    <div className={classes.title}>{editor.card.title}</div>
    <div className={classes.border}></div>
    <div>
      <Menu bars={bars}></Menu>
    </div>
    <div className={classes.border}></div>
    <div className={classes.workspace}>
      <Workspace selectedElementID={editor.selectedElementID}size={editor.card.size} card={editor.card}/>
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