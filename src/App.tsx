import React, {FC} from "react";
import ElementList from "./components/ElementList";
import Menu from "./components/Menu/Menu";
import classes from "./App.module.css";
import { connect, useSelector } from "react-redux";
import { store } from "./state/editor";


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
        func: () => {}
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

const App = ({card}:any) => {
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

function mapStateToProps(state:any) {
  return { card: state.card} 
};

export default connect(mapStateToProps)(App);
