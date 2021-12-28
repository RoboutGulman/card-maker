import "../components/UserInterface/MyButton/MyButton.css"
import {RefObject, useEffect, useRef, useState} from "react";
import MyButton from "../components/UserInterface/MyButton/MyButton";
import { useDispatch } from "react-redux";
import { ActionType } from "../state/editorReducer";

function useImageLoader(inputRef: RefObject<HTMLInputElement|null>) {
	const dispatch = useDispatch();
	const selectedImageUrlRef = useRef<string>()
	const [loading, setLoading] = useState(false)
	function addImage(source : string|undefined) {
		return {type: ActionType.ADD_IMAGE_ELEMENT, source: source};
	} 


	useEffect(() => {
		function revokeImageUrl() {
			if (selectedImageUrlRef.current != null) {
				window.URL.revokeObjectURL(selectedImageUrlRef.current)
			}
		}

		function updateSelectedImage() {
			revokeImageUrl()
			if (inputRef.current && inputRef.current.files) {
				const image = inputRef.current.files[0]
				selectedImageUrlRef.current = window.URL.createObjectURL(image)
				dispatch(addImage(selectedImageUrlRef.current))
			}
			setLoading(false)
		}

		inputRef.current?.addEventListener('change', updateSelectedImage)
		return () => {
			inputRef.current?.removeEventListener('change', updateSelectedImage)
			revokeImageUrl()
		}
	}, [inputRef])

	return {
		loading,
		url: selectedImageUrlRef.current,
		uploadImage: () => {
			if (!loading) {
				setLoading(true)
				inputRef.current?.click()
				
			}
		},
	}
}

function SelectImageButton() {
	const inputRef = useRef(null as HTMLInputElement|null)
	const {uploadImage, loading} = useImageLoader(inputRef)

	return (
<div className={"selected-image-button"}>
	<MyButton
		onClick={uploadImage}
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

export {
	SelectImageButton
};