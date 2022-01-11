import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Content } from '../Menu/Menu';
import Modal from '../Modal/Modal';
import MyButton from '../MyButton/MyButton';
type CreateCardButtonProps={
    index:number,
    setActive:(a:number)=>void;
    item : Content,
}
const CreateCardButton: FC<CreateCardButtonProps> = ({index, setActive, item} : CreateCardButtonProps) => {
    const dispatch = useDispatch();
    const [modalAcive, setModalActive] = useState(false)
    return (
        <div>
            <Modal active={modalAcive} setActive={setModalActive}>
                <p>Все несохранённые данные будут потеряны</p>
                <div><MyButton
                  text="всё равно создать" 
                  onClick={()=>{
                      setModalActive(false); 
                      setActive(-1); 
                      dispatch(item.func());
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

export default CreateCardButton
