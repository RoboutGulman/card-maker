import React, { FC, useState } from 'react'
import Dropdown from '../Dropdown/Dropdown';
import classes from './Menu.module.css';
export type Content={
    title: String,
    func: () => any;
  }
interface MenuProps {
    bars: {
      placeholder: String;
      content: Content[]
    }[];
}
const Menu: FC<MenuProps> = ({bars}: MenuProps) => {
    const [active, setActive] = useState(-1);
    return (
        <div className={classes.Menu}>
           {bars.map((bar: {placeholder: String, content: Content[]}, index: number) => 
              <div key={index}>
               <Dropdown isActive={active===index ? 1 : 0} 
                 placeholder={bar.placeholder}
                 content={bar.content} 
                 setActive={setActive} 
                 index={index}
               />
              </div>
            )}          
        </div>
    )
}

export default Menu
