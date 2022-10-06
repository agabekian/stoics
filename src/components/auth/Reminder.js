import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate, Outlet } from "react-router-dom";

const Reminder = (props) => {
    // const [modal, setModal] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(
        () => handleShow(), []
    )


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login ?</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5 >Please login to view and post comments.</h5></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    <Link to='/home'>home</Link>
                    {/* <Link to='/home'> <i className="fas fa-scroll"></i></Link> */}

                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    <Link to='/home'> <i className="fas fa-scroll"></i></Link>
                    </Button>
            </Modal.Footer>
        </Modal>
        </>
    )

};

export default Reminder;



