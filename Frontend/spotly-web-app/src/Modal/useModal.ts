import { useState } from "react";

export interface ModalProps {
  visible: boolean;
  isModalPreferences: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenPreferences: () => void;
  onClosePreferences: () => void;
}

const useModal = (): ModalProps => {
  const [visible, setVisible] = useState(false);
  const [isModalPreferences, setIsModalPreferen] = useState(false);


  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const handleOpenPreferences = () => setIsModalPreferen(true);
  const handleClosePreferences = () => setIsModalPreferen(false);


  return {
    visible,
    isModalPreferences, 
    onOpen: handleOpenModal, 
    onClose: handleCloseModal,
    onOpenPreferences: handleOpenPreferences,
    onClosePreferences: handleClosePreferences,
  }
};

export default useModal;
