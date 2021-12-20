import "./MyButton.css";
import {useState} from "react";
import {withMods} from "../withMods";

function MyButton({
  text,
  onClick,
  loading = false
} : {
  text: string;
  onClick: () => void;
  loading?: boolean;
}) {
  const [hover, setHovered] = useState(false);
  return (<button className={withMods("button", {
      hover: !loading && hover,
      loading: loading
    })} disabled={loading} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)} onClick={onClick}>
    <span className={"button-text"}>{text}</span>
  </button>);
}

export default MyButton;
