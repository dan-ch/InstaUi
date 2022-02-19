import Dialog from '@mui/material/Dialog';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {createPortal} from "react-dom";
import "App.scss";


interface ModalProps {
    open: boolean;
    setOpen:  Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
    scrollType?: "paper" | "body";
    maxWidth?: "xl" | "md" | "sm" | "xs" | "lg" | false;
    fullWidth?: boolean;
}

export const Modal: FC<ModalProps> = ({ open, setOpen, children, scrollType, maxWidth, fullWidth}) => {
    const handleClose = () => {
        setOpen(false);
    };
    return createPortal((
      <Dialog
          open={open}
          onClose={handleClose}
          scroll={scrollType ? scrollType : "body"}
          className="modal"
          maxWidth={maxWidth}
          fullWidth={fullWidth}
      >
          {children}
      </Dialog>
    ), document.body);
 }