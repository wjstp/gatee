import { useState } from 'react';
import {useModalStore} from "@store/useModalStore";

const UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {setShowModal} = useModalStore()

  const openModal = (): void => {
    setIsOpen(true);
    setShowModal(true)
  }

  const closeModal = (): void => {
    setIsOpen(false);
    setShowModal(false)
  }

  return { isOpen, openModal, closeModal };
};

export default UseModal;