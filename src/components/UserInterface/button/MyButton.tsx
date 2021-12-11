import "./MyButton.css"
import {useState} from "react";
import {Spinner} from "../Spinner/Spinner";
import {withMods} from "../withMods";

/**
 * @param {{
 *   text: string,
 *   loading: (boolean|undefined),
 *   onClick: function(): void,
 * }} props
 */
function MyButton({
	text,
	onClick,
	loading = false,
}: {
	text: string,
	onClick: () => void,
	loading?: boolean,
}) {
	const [hover, setHovered] = useState(false)
	return (
<button
	className={withMods("button", { // разворачиваем в строку 'button'|'button button_hover'|'button button_loading'
		"hover": !loading && hover,
		"loading": loading,
	})}
	disabled={loading}
	onMouseOver={() => setHovered(true)}
	onMouseOut={() => setHovered(false)}
	onClick={onClick}
>
	<span className={"button-text"}>{text}</span>
</button>)
}

export default MyButton;
