import React, {FC} from "react";
import {useDispatch} from "react-redux";
import MyButton from "../button/MyButton";
import {Content} from "../Menu/Menu";
import classes from "./Dropdown.module.css";
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
          content && content.map((item : Content, key : number) => {
            return (<MyButton text={item.title} onClick={() => {
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
