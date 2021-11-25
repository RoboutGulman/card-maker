import React, { FC } from 'react'
import Dropdown from '../Dropdown/Dropdown';
import classes from './Menu.module.css';

interface MenuProps {
    bars: {
      placeholder: String;
      content: String[];
    }[];
}
const Menu: FC<MenuProps> = ({bars}: MenuProps) => {
    return (
        <div className={classes.Menu}>
           {bars.map((bar: {placeholder: String, content: String[]}) =>
               <Dropdown placeholder={bar.placeholder} content={bar.content}></Dropdown>
             )}          
        </div>
    )
}

export default Menu
