import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
      <div >
      <div style={{
        // fontFamily: "Cinzel"
      }}>

        <span style={{ fontSize: '14px' }}>
          {user.name}'s
        </span>
          {/* <img
            referrerpolicy="no-referrer"
            src={user.picture}
            alt={user.name}
            style={{ borderRadius: '50%' }}
          /> */}
        </div>
      </div>
    </>
    )
  );
};

export default Profile;