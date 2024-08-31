import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { FaFileDownload } from 'react-icons/fa';
import ProgressBar from '@ramonak/react-progress-bar';
import AlertModal from '@app/utils/alert';

interface download {
  showProgressBar: boolean;
  FileData: any;
  progress: number;
  setAbortDownload: any;
}

export const DownloadPopup: React.FC<download> = ({
  showProgressBar,
  FileData,
  progress,
  setAbortDownload,
}) => {
  const [closeClicked, setCloseClicked] = React.useState(false);

  const handleModalCancel = () => {
    setCloseClicked(false);
  };

  const handleAbortDownload = () => {
    setAbortDownload();
    setCloseClicked(false);
  };
  return (
    <>
      <Modal
        show={showProgressBar}
        onHide={() => setCloseClicked(true)}
        centered={true}
      >
        <ModalHeader placeholder={undefined}>
          <Modal.Title id="contained-modal-title-vcenter">
            Downloading...
          </Modal.Title>
        </ModalHeader>
        <Modal.Body className="text-center">
          <FaFileDownload
            size={60}
            style={{ marginBottom: '20px', color: '#6a1b9a' }}
          />
          <p>
            <strong>FileName:</strong>
            {FileData?.FileName ?? FileData}
          </p>
          <ProgressBar
            completed={progress}
            bgColor="#6a1b9a"
            height="20px"
            labelColor="#ffffff"
            baseBgColor="#e0e0df"
            labelAlignment="center"
            borderRadius="5px"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setCloseClicked(true)}
            className="btn-sm"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertModal
        show={closeClicked}
        onCancel={handleModalCancel}
        onConfirm={handleAbortDownload}
        bodyMessage="File Upload is in Progress. Are You Sure You want to Cancel?"
        title="Confirmation"
      />
    </>
  );
};
