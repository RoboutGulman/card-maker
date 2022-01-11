import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ActionType } from '../../../state/editorReducer';
import { Content } from '../Menu/Menu';
import Modal from '../Modal/Modal';
import MyButton from '../MyButton/MyButton';
type TemplatesButtonProps={
    index:number,
    setActive:(a:number)=>void;
    item:Content;
}
const setTemplate=(index:number)=>{
    return {type:ActionType.SET_TEMPLATE, index:index}
}
const TemplatesButton: FC<TemplatesButtonProps> = ({index, setActive,item} : TemplatesButtonProps) => {
    const dispatch = useDispatch();
    const [modalAcive, setModalActive] = useState(false)
    return (
        <div>
            <Modal active={modalAcive} setActive={setModalActive}>
                <p>Выберите шаблон</p>
                <div><MyButton
                  text="тест" 
                  onClick={()=>{
                      setModalActive(false); 
                      setActive(-1); 
                      dispatch(setTemplate(1));
                    }}/>
                    </div>
                <MyButton 
                  text="отмена"
                  onClick={()=>{
                      setModalActive(false);
                      setActive(-1);
                  }}/>
            </Modal>
            <MyButton 
              key={index} 
              text={item.title} 
              onClick={() => {setModalActive(true); }}/>
        </div>
    )
}

export default TemplatesButton
