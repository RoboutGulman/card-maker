import React, {Dispatch, FC, SetStateAction} from "react";
import classes from "./Modal.module.css";
type ModalProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children?: any;
};
const Modal: FC<ModalProps> = ({active, setActive, children} : ModalProps) => {
  return (
  <div className={active ? classes.modal_active + " " + classes.modal: classes.modal} onClick={() => setActive(false)}>
    <div className={active ? classes.content_active + " " + classes.content: classes.content} onClick={e => e.stopPropagation()}>
        {children}
    </div>
  </div>);
};

export default Modal;
