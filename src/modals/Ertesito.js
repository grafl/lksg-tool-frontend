
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Ertesito = ({ show, handleSend, handleCancel, investigation }) => {
    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Request investigation response?</Modal.Title>
            </Modal.Header>
            <Modal.Body><b>{investigation.bpn} {investigation.bpn}</b>({investigation.bpn})
                will be requested.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleSend(investigation)}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Ertesito;
