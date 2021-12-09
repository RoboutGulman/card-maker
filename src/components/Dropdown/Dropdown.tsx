import React, {FC} from "react";
import classes from "./Dropdown.module.css";

interface DropDownProps {
  isActive: number;
  placeholder: String;
  content: String[];
  setActive: (num:number)=>void;
  index: number;
}
const DropDown: FC<DropDownProps> = ({isActive, placeholder, content, setActive, index} : DropDownProps) => {
  return (<div className={isActive
      ? classes.wrapper_active + " " + classes.wrapper
      : classes.wrapper
}>
    <span className={classes.span} onClick={() => {
        setActive(
          isActive
          ? -1
          : index);
      }}>
      <div>{placeholder}</div>
    </span>
    <div className={classes.drop_down}>
      <ul className={classes.ul}>
        {
          content && content.map((item : String, key : number) => {
            return (<li className={classes.li} onClick={() => {
              setActive(-1);
              }} key={key}>
              {item}
            </li>);
          })
        }
      </ul>
    </div>
  </div>);
};

export default DropDown;
