import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const Modal = ({
  show,
  onHide,
  title,
  children,
  size = 'md',
  footer = true,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  centered = true,
  fullscreen = false
}) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      fullscreen={fullscreen ? true : undefined}
      backdrop="static"
    >
      <BootstrapModal.Header className="border-0 pb-0">
        <BootstrapModal.Title className="fw-bold">{title}</BootstrapModal.Title>
        <Button
          variant="link"
          onClick={onHide}
          className="p-0 ms-auto"
          style={{ lineHeight: 1 }}
        >
          <X size={24} />
        </Button>
      </BootstrapModal.Header>
      
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      
      {footer && (
        <BootstrapModal.Footer className="border-0 pt-0">
          <Button
            variant="outline-secondary"
            onClick={onCancel || onHide}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

export default Modal;