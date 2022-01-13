import React, { useRef } from 'react'
import { LoadingType, useFileLoader } from '../../../../customHooks/useFileLoader'
import MyButton from '../../MyButton/MyButton'

function SelectCardButton() {
	const inputRef = useRef(null as HTMLInputElement|null)
	const {upload, loading} = useFileLoader(inputRef, LoadingType.CARD, null, null)

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



export default SelectCardButton
