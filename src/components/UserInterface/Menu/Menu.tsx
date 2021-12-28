import React, {FC, useState} from "react";
import {ActionType} from "../../../state/editor";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./Menu.module.css";
export type Content = {
  title: string;
  func: () => any;
};

const Menu = () => {
  function addText(textContent : string) {
    return {type: ActionType.ADD_TEXT_ELEMENT, textContent: textContent};
  }
  function editText(textContent : string) {
    return {type: ActionType.EDIT_TEXT_CONTENT, textContent: textContent};
  }

  const bars = [
    {
      placeholder: "файл",
      content: [
        {
          title: "создать",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }, {
          title: "открыть",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }, {
          title: "сохранить",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }, {
          title: "о программе",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }
      ]
    }, {
      placeholder: "правка",
      content: [
        {
          title: "undo",
          func: () => {
            return {type: ActionType.UNDO};
          }
        }, {
          title: "redo",
          func: () => {
            return {type: ActionType.REDO};
          }
        }, {
          title: "удалить",
          func: () => {
            return {type: ActionType.DELETE_ELEMENT};
          }
        }, {
          title: "изменить",
          func: () => {
            const x = prompt();
            return editText(
              x == null
              ? ""
              : x);
          }
        }
      ]
    }, {
      placeholder: "фильтры",
      content: [
        {
          title: "серый",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }, {
          title: "красный",
          func: () => {
            return {type: "UNDEFINED"};
          }
        }, {
          title: "синий",
          func: () => {
            return {type: "UNDEFINED"};
          }
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
          func: () => {
            return {type: ActionType.ADD_RECTANGLE};
          }
        }, {
          title: "треугольник",
          func: () => {
            return {type: ActionType.ADD_TRIANGLE};
          }
        }, {
          title: "круг",
          func: () => {
            return {type: ActionType.ADD_CIRCLE};
          }
        }, {
          title: "картинка",
          func: () => {
            return {type: ActionType.ADD_IMAGE_ELEMENT};
          }
        }
      ]
    }
  ];
  const [active, setActive] = useState(-1);
  return (<div className={classes.Menu}>
    {
      bars.map((bar : {
        placeholder: string;
        content: Content[];
      }, index : number) => (<Dropdown key={index} isActive={active === index
          ? 1
          : 0} placeholder={bar.placeholder} content={bar.content} setActive={setActive} index={index}/>))
    }
  </div>);
};

export default Menu;
