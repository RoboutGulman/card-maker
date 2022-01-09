import "../components/UserInterface/MyButton/MyButton.css"
import {RefObject, useEffect, useRef, useState} from "react";
import MyButton from "../components/UserInterface/MyButton/MyButton";
import { useDispatch } from "react-redux";
import { ActionType } from "../state/editorReducer";

enum LoadingType {
	IMAGE,
	CARD
}


function useFileLoader(inputRef: RefObject<HTMLInputElement|null>, type:LoadingType) {
	const dispatch = useDispatch();
	const urlRef = useRef<string>()
	const [loading, setLoading] = useState(false)
	function Load(file:any, type:LoadingType){
    if (type===LoadingType.CARD){
		var reader = new FileReader();
		reader.onload = function(event:any) {
			var contents = event.target.result;
			var object = JSON.parse(contents);
			console.log(object);
			dispatch(loadCard(object))
		};
		reader.onerror = function(event) {
			console.error("Файл не может быть прочитан! код " + event.target?.error?.code);
		}; 
		reader.readAsText(file);
		
	}else{
		urlRef.current = window.URL.createObjectURL(file)
		dispatch(addImage(urlRef.current))
	}
	}

	function addImage(source : string|undefined) {
		return {type: ActionType.ADD_IMAGE_ELEMENT, source: source};
	} 
	function loadCard(card: any) {
		return {type: ActionType.LOAD_CARD, card: card};
	} 

	useEffect(() => {
		function revokeUrl() {
			if (urlRef.current != null) {
				window.URL.revokeObjectURL(urlRef.current)
			}
		}

		function updateSelectedFile() {
			revokeUrl()
			if (inputRef.current && inputRef.current.files) {
				const file = inputRef.current.files[0]
                Load(file, type)
			}
			setLoading(false)
		}

		inputRef.current?.addEventListener('change', updateSelectedFile)
		return () => {
			inputRef.current?.removeEventListener('change', updateSelectedFile)
			revokeUrl()
		}
	}, [inputRef])

	return {
		loading,
		upload: () => {
			if (!loading) {
				setLoading(true)
				inputRef.current?.click()
			}
		},
	}
}

function SelectImageButton() {
	const inputRef = useRef(null as HTMLInputElement|null)
	const {upload, loading} = useFileLoader(inputRef, LoadingType.IMAGE)

	return (
<div>
	<MyButton
		onClick={upload}
		loading={loading}
		text={"картинка"}
	/>
	<input
		ref={inputRef}
		type="file"
		style={{'display': 'none'}}
	/>
</div>)
}

function SelectCardButton() {
	const inputRef = useRef(null as HTMLInputElement|null)
	const {upload, loading} = useFileLoader(inputRef, LoadingType.CARD)

	return (
<div>
	<MyButton
		onClick={upload}
		loading={loading}
		text={"открыть"}
	/>
	<input
		ref={inputRef}
		type="file"
		style={{'display': 'none'}}
	/>
</div>)
}

export {
	SelectImageButton,
	SelectCardButton
};