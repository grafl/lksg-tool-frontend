
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Typeahead} from "react-bootstrap-typeahead";

const LookupBpn = ({ title, companies, minCharacters, show, textPositive, handlePositive, textNegative, handleNegative }) => {
    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleNegative}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Typeahead
                    id="custom-filtering-example"
                    options={ companies }
                    minLength={minCharacters}
                    labelKey={option => `${option.name} - ${option.street} `}
                    filterBy={['co_name']}
                    placeholder="Type at least {minCharacters} characters"
                    onChange={(selected) => {

                    }}
                    renderMenuItemChildren={(option: Option) => (
                        <div>
                            {option.name}
                            <div>
                                <small><b>Location:</b> {option.location}</small>&nbsp;
                                <small><b>Street:</b> {option.street} {option.nr}</small>&nbsp;
                                <small><b>ZIP:</b> {option.zipCode}</small>&nbsp;
                                <small><b>Country:</b> {option.country}</small>&nbsp;
                            </div>
                        </div>
                    )}
                />
            </Modal.Body>
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

export default LookupBpn;
