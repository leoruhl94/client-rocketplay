import React, { useState } from "react";

// interface Open {
//   initialValue:Boolean;
//   isOpen:Boolean;
//   openModal?(): void;
//   closeModal?(): void;
// }

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = () => {
    console.log("Abre");
    setIsOpen(true);
  };
  const closeModal = () =>{
    console.log("Cierra");
    setIsOpen(false);
  } 

  return [isOpen, openModal, closeModal];
};
