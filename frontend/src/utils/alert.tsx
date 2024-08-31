import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GenericModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  bodyMessage: string;
  title: string;
}

const AlertModal: React.FC<GenericModalProps> = ({
  show,
  onCancel,
  onConfirm,
  bodyMessage,
  title,
}) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header placeholder={undefined} closeButton>
        <Modal.Title>
          <strong>{title}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{bodyMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
