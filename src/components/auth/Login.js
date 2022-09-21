import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from 'react-bootstrap/Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <a  style={{margin:"5px"}} onClick={() => loginWithRedirect()}>Log In</a>;
};

export default LoginButton;