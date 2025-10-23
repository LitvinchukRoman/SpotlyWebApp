import { useState } from "react";

export interface ModalProps {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModal = (): ModalProps => {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);

  return {visible, onOpen: handleOpenModal, onClose: handleCloseModal}
};

export default useModal;
