import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from 'react-bootstrap/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <a  onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </a>
  );
};

export default LogoutButton;