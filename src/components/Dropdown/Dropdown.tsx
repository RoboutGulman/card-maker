import React, { useState } from "react";
///import { mdiMenuDown } from "@mdi/js";
// Icon from "@mdi/react";
import classes from './Dropdown.module.css';
export default function DropDown({ placeholder , content}:any) {
const [active, setactive] = useState(0);
return (
<div className={active ? classes.wrapper_active+' '+classes.wrapper : classes.wrapper}>
  <span className={classes.span}
    onClick={() => {
      setactive(active ? 0 : 1);
    }}
  >
  <div>{placeholder}</div>
  </span>
  <div className= {classes.drop_down}>
    <ul className= {classes.ul}>
      {content &&
        content.map((item:any, key:any) => {
          return (
            <li className= {classes.li}
              onClick={() => {
                setactive(0);
              }}
              key={key}
            >
              {item}
            </li>
          );
        })}
    </ul>
  </div>
</div>
);}

/*
<Icon path={mdiMenuDown}/>
*/