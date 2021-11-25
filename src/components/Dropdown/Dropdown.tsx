import React, { useState } from "react";
///import { mdiMenuDown } from "@mdi/js";
// Icon from "@mdi/react";
import './Dropdown.css';
export default function DropDown({ placeholder , content}:any) {
const [active, setactive] = useState(0);
return (
<div className={active ? "dropdown_wrapper active" : "dropdown_wrapper"}>
  <span
    onClick={() => {
      setactive(active ? 0 : 1);
    }}
  >
  <div>{placeholder}</div>
  </span>
  <div className="drop_down">
    <ul>
      {content &&
        content.map((item:any, key:any) => {
          return (
            <li
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