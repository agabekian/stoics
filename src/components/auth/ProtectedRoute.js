import { Navigate } from "react-router-dom";
import { useState } from 'react';
// import { useAuth } from "../hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";
import Reminder from './Reminder'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProtectedRoute = (props) => {
    // const [modal, setModal] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Reminder show={show}/>
        )
    }
    return props.children;

};



