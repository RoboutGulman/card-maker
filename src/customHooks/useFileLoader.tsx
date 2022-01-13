import "../components/UserInterface/MyButton/MyButton.css"
import {RefObject, useEffect, useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../state/editorReducer";
import { Size } from "../model/Types";

export enum LoadingType {
	IMAGE,
	CARD
}
export function addImage(source : string|undefined, size: Size) {
	return {type: ActionType.ADD_IMAGE_ELEMENT, source: source, size: size};
} 
export function useFileLoader(inputRef: RefObject<HTMLInputElement|null>, type:LoadingType, cardSize: Size|null, setModalAcive:any) {
	const dispatch = useDispatch();
	const urlRef = useRef<string>()
	const [loading, setLoading] = useState(false)
	const [newCardSize, setNewCardSize] = useState({height:0, width:0})
	function Load(file:any, type:LoadingType){
    if (type===LoadingType.CARD){
		var reader = new FileReader();
		reader.onload = function(event:any) {
			var contents = event.target.result;
			var object = JSON.parse(contents);
			dispatch(loadCard(object))
		};
		reader.onerror = function(event) {
			console.error("Файл не может быть прочитан! код " + event.target?.error?.code);
		}; 
		reader.readAsText(file);
		
	}else{
		urlRef.current = window.URL.createObjectURL(file)
		var image = new Image();
		image.src = urlRef.current
		image.onload = function() {
		setNewCardSize({width:image.width, height:image.height})
		if (cardSize != null&&(image.width>cardSize.width||image.height>cardSize.height))
		setModalAcive(true)
		else
		dispatch(addImage(urlRef.current, {width:image.width, height:image.height}))
	   }
	}
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
	}, [inputRef, Load, type])

	return {
		loading,
		upload: () => {
			if (!loading) {
				setLoading(true)
				inputRef.current?.click()
			}
		},
		newCardSize,
		url: urlRef.current,
	}
}