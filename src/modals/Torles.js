
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Torles = ({ title, body, show, textPositive, handlePositive, textNegative, handleNegative }) => {
    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleNegative}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleNegative}>
                    {textNegative}
                </Button>
                <Button variant="secondary" onClick={handlePositive}>
                    {textPositive}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Torles;
