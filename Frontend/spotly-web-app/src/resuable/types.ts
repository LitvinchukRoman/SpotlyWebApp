export interface ModalProps {
  visible: boolean;
  isModalPreferences: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenPreferences: () => void;
  onClosePreferences: () => void;
}
