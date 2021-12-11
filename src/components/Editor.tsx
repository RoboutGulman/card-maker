import React, {FC} from "react";
import Menu from "./UserInterface/Menu/Menu";
import classes from "./Editor.module.css";
import {connect} from "react-redux";
import Workspace from "./Workspace";

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
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "треугольник",
        func: () => {return {type: "UNDEFINED"}}
      }, {
        title: "круг",
        func: () => {return {type: "UNDEFINED"}}
      }
    ]
  }
];

const Editor = ({card} : any) => {
  return (<div className={classes.app}>
    <div className={classes.title}>{card.title}</div>
    <div className={classes.border}></div>
    <div>
      <Menu bars={bars}></Menu>
    </div>
    <div className={classes.workspace}>
      <Workspace size={card.size} elements={card.elements}/>
    </div>
  </div>);
};

function mapStateToProps(state : any) {
  return {card: state.card};
}

export default connect(mapStateToProps)(Editor);
/* bars можно не перерисовывать, то есть изменить тут connect
брать элементы из стейта уже в elements(если это так работает)
elementForm и text.ts можно удалять */
