import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Note from "../Note";
import axios from 'axios';

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const storeUser = () => {
    const target = `${process.env.REACT_APP_SERVER}/api/users`
    console.log("post to",target,user.name);
                  axios.post(target,
                      {
                          name: user.name,
                          email: user.email
                      })      // const repsonse = axios.get(`${process.env.REACT_APP_SERVER}/api/users`)
      //     .then(res => {
      //         let dbUsers = new Set(res.data.map(u => u.name))
      //         // const selectedUser = this.state.quotes.filter(q => q.id == id);
      //         // const qid = selectedQuote[0].id
      //         // this.props.togglePop()
      //         if (!dbUsers.has(selectedUser)) {

      //             console.log("grabbed quote", selectedQuote, qid, dbIndexes)
      //             // if()
      //             axios.post(`${process.env.REACT_APP_SERVER}/api/users`,
      //                 {
      //                     name: user.name,
      //                     email: user.email
      //                 },
      //                 this.setState({ dupe: false }))
      //             console.log(res);
      //         } else {
      //             this.setState({ dupe: true })
      //             console.log("This user already exists in the database ", user_id)
      //         }
      //     })
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
          user={user.name}
          togglePop={props.togglePop}
        />
        {/* <button onClick={storeUser}>storeUser</button> */}
      </>
      : "Please login to view and post comments"
  );
};

export default Profile;