import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalGraffiti = ({ modalContent, closeModal }) => {
    const [smShow, setSmShow] = useState(true);

    const close = () => {
        setSmShow(false);
        closeModal();
    };

    return (
        <Modal
            size="sm"
            show={smShow}
            onHide={() => close()}
            aria-labelledby="smallModal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="smallModal">Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent}</Modal.Body>
        </Modal>
    );
};

export default ModalGraffiti;
