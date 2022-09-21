import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Logout from './Logout'

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{
        fontFamily: "Cinzel"
      }}>
        <div className="QList-title">
          <div onClick={props.toggleAbout} >stoic companion
          </div>
          {/* <img
            referrerpolicy="no-referrer"
            src={user.picture}
            alt={user.name}
            style={{ borderRadius: '50%' }}
          /> */}
        </div>
        <div >
          <p>{user.name}</p>
        </div>
      </div>
    )
  );
};

export default Profile;