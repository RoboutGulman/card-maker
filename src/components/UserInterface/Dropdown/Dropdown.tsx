import React, {FC} from "react";
import {useDispatch} from "react-redux";
import MyButton from "../MyButton/MyButton";
import {Content} from "../Menu/Menu";
import classes from "./Dropdown.module.css";
import { SelectImageButton } from "../../../customHooks/useImageLoader";
interface DropDownProps {
  isActive: number;
  placeholder: string;
  content: Content[];
  setActive: (num : number) => void;
  index: number;
}
const DropDown: FC<DropDownProps> = ({isActive, placeholder, content, setActive, index} : DropDownProps) => {
  const dispatch = useDispatch();
  return (<div className={isActive
      ? classes.wrapper_active + " " + classes.wrapper
      : classes.wrapper
}>
    <MyButton text={placeholder} onClick={() => {
        setActive(
          isActive
          ? -1
          : index);
      }}/>
    <div className={classes.drop_down}>
      <ul className={classes.ul}>
        {
          content && content.map((item : Content, index : number) => {
            if (item.title==="картинка") {return (<SelectImageButton></SelectImageButton>)} else
            return (<MyButton key={index} text={item.title} onClick={() => {
                setActive(-1);
                dispatch(item.func());
              }}/>);
          })
        }
      </ul>
    </div>
  </div>);
};

export default DropDown;
