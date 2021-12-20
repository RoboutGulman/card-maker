import React, {FC, useState} from "react";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./Menu.module.css";
export type Content = {
  title: string;
  func: () => any;
};
interface MenuProps {
  bars: {
    placeholder: string;
    content: Content[];
  }[];
}
const Menu: FC<MenuProps> = ({bars} : MenuProps) => {
  const [active, setActive] = useState(-1);
  return (<div className={classes.Menu}>
    {
      bars.map((bar : {
        placeholder: string;
        content: Content[];
      }, index : number) => (
        <Dropdown key={index} isActive={active === index
            ? 1
            : 0} placeholder={bar.placeholder} content={bar.content} setActive={setActive} index={index}/>
          ))
    }
  </div>);
};

export default Menu;
