import React, {FC} from "react";
import {useDispatch} from "react-redux";
import MyButton from "../MyButton/MyButton";
import {Content} from "../Menu/Menu";
import classes from "./Dropdown.module.css";
import {SelectCardButton, SelectImageButton} from "../../../customHooks/useFileLoader";
import {Size} from "../../../model/Types";
import CreateCardButton from "./CreateCardButton";
import {saveCardAs} from "../../../model/components/Dropdown/Dropdown";

interface DropDownProps {
  cardSize: Size;
  isActive: number;
  placeholder: string;
  content: Content[];
  setActive: (num : number) => void;
  index: number;
}

const DropDown: FC<DropDownProps> = (props : DropDownProps) => {
  const dispatch = useDispatch();

  return (<div className={props.isActive
      ? classes.wrapper_active + " " + classes.wrapper
      : classes.wrapper
}>
    <MyButton text={props.placeholder} onClick={() => {
        props.setActive(
          props.isActive
          ? -1
          : props.index);
      }}/>
    <div className={classes.drop_down}>
      <ul className={classes.ul}>
        {
          props.content && props.content.map((item : Content, index : number) => {
            switch (item.title) {
              case "картинка":
                return (<SelectImageButton cardSize={props.cardSize} key={index}/>);
              case "открыть":
                return <SelectCardButton key={index}/>;
              case "создать":
                return (<CreateCardButton key={index} index={index} setActive={props.setActive} item={item}/>);
              case "сохранить как":
                return (<MyButton key={index} text="сохранить как" onClick={() => saveCardAs(props.cardSize)}/>);
              default:
                return (<MyButton key={index} text={item.title} onClick={() => {
                    props.setActive(-1);
                    dispatch(item.func());
                  }}/>);
            }
          })
        }
      </ul>
    </div>
  </div>);
};

export default DropDown;
