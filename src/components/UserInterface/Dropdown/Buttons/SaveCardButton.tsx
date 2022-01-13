import React, { FC, useState } from 'react'
import { formatType, saveCardAs } from '../../../../model/components/Dropdown/Dropdown';
import { Size } from '../../../../model/Types';
import { Content } from '../../Menu/Menu';
import Modal from '../../Modal/Modal';
import MyButton from '../../MyButton/MyButton';
type SaveCardButtonProps={
    index:number,
    setActive:(a:number)=>void,
    item:Content,
    cardSize: Size
}

const SaveCardButton: FC<SaveCardButtonProps> = ({index, setActive, item, cardSize} : SaveCardButtonProps) => {
    const [modalAcive, setModalActive] = useState(false)
    return (
        <div>
            <Modal active={modalAcive} setActive={setModalActive}>
                <div style={{font: '600 14px Arial'}}><p>Выберите формат</p></div>
                <div><MyButton
                  text="png" 
                  onClick={()=>{
                      saveCardAs({type:formatType.png, size:cardSize});
                      setModalActive(false); 
                      setActive(-1); 
                    }}/>
                    </div>
                <MyButton 
                  text="jpeg"
                  onClick={()=>{
                      saveCardAs({type:formatType.jpeg, size:cardSize});
                      setModalActive(false);
                      setActive(-1);
                  }}/>
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

export default SaveCardButton