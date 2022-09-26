import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Note from "../Note";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? 
      <>
      <div style={{
        // fontFamily: "Cinzel"
      }}>

        <span style={{ fontSize: '14px' }}>
          {/* {user.name}'s */}
        </span>
          {/* <img
            referrerpolicy="no-referrer"
            src={user.picture}
            alt={user.name}
            style={{ borderRadius: '50%' }}
          /> */}
        </div>
        <Note
        user = {user.name}
        togglePop = {props.togglePop}
        />
    </>
    : "Please login to view and post comments"
  );
};

export default Profile;