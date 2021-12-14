import React, { useState } from "react";

// interface Open {
//   initialValue:Boolean;
//   isOpen:Boolean;
//   openModal?(): void;
//   closeModal?(): void;
// }

export const useOpen = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const open = () => {
    console.log("Abre");
    setIsOpen(true);
  };
  const close = () =>{
    console.log("Cierra");
    setIsOpen(false);
  } 

  return [isOpen, open, close];
};
