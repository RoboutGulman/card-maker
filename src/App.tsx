import React, {FC} from "react";
import ElementList from "./components/ElementList";
import Menu from "./components/Menu/Menu";
import classes from "./App.module.css";
import {connect} from "react-redux";

function addText(textContent : string) {
  return {type: "ADD_TEXT_ELEMENT", textContent: textContent};
}

const bars = [
  {
    placeholder: "файл",
    content: [
      {
        title: "создать",
        func: () => {}
      }, {
        title: "открыть",
        func: () => {}
      }, {
        title: "сохранить",
        func: () => {}
      }, {
        title: "о программе",
        func: () => {}
      }
    ]
  }, {
    placeholder: "фильтры",
    content: [
      {
        title: "серый",
        func: () => {}
      }, {
        title: "красный",
        func: () => {}
      }, {
        title: "синий",
        func: () => {}
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
        func: () => {}
      }, {
        title: "треугольник",
        func: () => {}
      }, {
        title: "круг",
        func: () => {}
      }
    ]
  }
];

const App = ({card} : any) => {
  return (<div className={classes.app}>
    <div className={classes.title}>{card.title}</div>
    <div className={classes.border}></div>
    <div>
      <Menu bars={bars}></Menu>
    </div>
    <div className={classes.workspace}>
      <ElementList elements={card.elements}/>
    </div>
  </div>);
};

function mapStateToProps(state : any) {
  return {card: state.card};
}

export default connect(mapStateToProps)(App);
/* bars можно не перерисовывать, то есть изменить тут connect
брать элементы из стейта уже в elements(если это так работает)
elementForm и text.ts можно удалять */
