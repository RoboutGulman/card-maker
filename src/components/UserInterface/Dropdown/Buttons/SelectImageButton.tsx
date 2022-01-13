import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addImage, LoadingType, useFileLoader } from '../../../../customHooks/useFileLoader';
import { Size } from '../../../../model/Types';
import { ActionType } from '../../../../state/editorReducer';
import Modal from '../../Modal/Modal';
import MyButton from '../../MyButton/MyButton';

type SelectImageButtonProps = {
	cardSize:Size;
  };
function changeCardSize(size:Size){
  return {type: ActionType.CHANGE_CARD_SIZE, size:size}
}
function SelectImageButton({cardSize}:SelectImageButtonProps) {
	const dispatch = useDispatch();
	const [modalAcive, setModalAcive] = useState(false)
	const inputRef = useRef(null as HTMLInputElement|null)
	const {upload, loading, newCardSize, url} = useFileLoader(inputRef, LoadingType.IMAGE, cardSize, setModalAcive)

	return (
<div>
    <Modal active={modalAcive} setActive={setModalAcive}> 
	  <p>Размер картинки превышает размер холста. </p>
	  <MyButton 
	    text={"Расширить холст"} 
		onClick={()=>{
			dispatch(changeCardSize(newCardSize))
			dispatch(addImage(url, newCardSize))
			setModalAcive(false)
		  }
		}
	  />
	  <MyButton 
	    text={"Сжать изображение"} 
		onClick={()=>{
			const widthToHeight=newCardSize.width/newCardSize.height
			var newImageSize={width:0, height:0}
			if (widthToHeight>1){
			newImageSize.width=cardSize.width-40
			newImageSize.height=newImageSize.width/widthToHeight}
			else{
				newImageSize.height=cardSize.height-40
				newImageSize.width=newImageSize.height*widthToHeight
			}
			dispatch(addImage(url, newImageSize))
			setModalAcive(false)
		  }
		}
	  />
	  
	  <MyButton 
	  text={"отменить вставку изображения"} 
	  onClick={()=>{
		  setModalAcive(false)
		}
	  }
	  />
	</Modal>
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

export default SelectImageButton
