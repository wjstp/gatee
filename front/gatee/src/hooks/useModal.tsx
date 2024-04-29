import { useState } from 'react';

const UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  }
  const closeModal = (): void => {
    setIsOpen(false);
  }

  return { isOpen, openModal, closeModal };
};

export default UseModal;