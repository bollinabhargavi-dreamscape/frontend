import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { confirmable, ConfirmDialogProps } from 'react-confirm';

export interface Props {
  okLabel?: string;
  cancelLabel?: string;
  title?: string;
  confirmation?: string;
  reasonLabel?: string;
  type?: 'void' | 'duplicate';
  data: any;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (voidReason: string) => void;
}

const Confirmation: React.FC<ConfirmDialogProps<Props, boolean>> = (props) => {
  const [voidReason, setVoidReason] = React.useState('');
  const handleConfirm = () => {
    if (props.onConfirm) {
      props.onConfirm(voidReason);
    }
    props.proceed(true);
  };
  return (
    <div className="static-modal">
      <Modal
        animation={false}
        show={props.show}
        onHide={() => props.proceed(false)}
        backdrop={true}
      >
        <Modal.Header placeholder="" closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>
            <strong>{props.title}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2">
            {props?.data
              ? Object.keys(props?.data)?.map?.((item) => (
                  <div className="col-12" key={item}>
                    <strong style={{ fontSize: '15px' }}>{item}</strong> :{' '}
                    {props?.data?.[item]}
                  </div>
                ))
              : ''}
          </div>
          <label>{props.reasonLabel}</label>
          <textarea
            className="form-control"
            value={voidReason}
            onChange={(e) => setVoidReason(e.target.value)}
            cols={50}
            rows={4}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary"
            onClick={() => props.proceed(false)}
          >
            {props.cancelLabel || 'cancel'}
          </Button>
          <Button className="btn btn-primary" onClick={handleConfirm}>
            {props.okLabel || 'ok'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default confirmable(Confirmation);
