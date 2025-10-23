import type { FC, PropsWithChildren } from 'react';
import type { ModalProps } from './useModal';
import ModalLayout from './ModalLayout';

type ModalComponentProps = PropsWithChildren<ModalProps>;

const Modal: FC<ModalComponentProps> = ({
  ...layoutProps
}) => {
  if (!open) return null;

  return (
    <ModalLayout {...layoutProps} />
  );
}

export default Modal;
