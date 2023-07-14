import React, { Component } from "react";
import axios from "axios";
import SavedQuote from "./SavedQuote";
import "./Favs.css";
import { v4 as uuidv4 } from "uuid";


export default class Favs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: [],
    };
  }

  componentDidMount() {
    this.getSavedQuotes();
  }

    getSavedQuotes() { //original func
      console.log("axios ---->")
      axios.get(`${process.env.REACT_APP_SERVER}/api/entries`)
      .then((res) => {
        this.setState({ favs: res.data });
      })
      .catch((e)=>console.log("Damn! it's ", e.message))
    };
    

  // getSavedQuotes = async () => {
  //   try {
  //     let savedQuotes = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/api/entries`
  //     );
  //     this.setState({ favs: savedQuotes.data });
  //     this.props.toggleLoading();
  //   } catch (error) {
  //     console.log("We have an error: ", error.response);
  //   }
  // };

  //   useEffect(()=> setFavs(props.favs ))
  //   if (this.state.favs.length === 0) {
  //       this.props.toggleLoading();

  // }

  // const updateEntry = (entryId) => {
  //     console.log(entryId)
  //     axios.put(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
  //         .then(res => {
  //         }).catch(err => console.log(err));
  // }

  deleteEntry(entryId){
    console.log("deleted: ", entryId);
    axios
      .delete(`${process.env.REACT_APP_SERVER}/api/entries/${entryId}`)
      .then((res) => {})
      .catch((err) => console.log(err));
    let updatedFavs = this.state.favs.filter((i) => i._id != entryId);
    this.setState({favs:updatedFavs})
    // this.props.updateFavsState(fFavs);
  }

  render() {
    let idx = uuidv4();
    return (
      <>
        <div className="QList-words">
          {this.props.loading ? (
            <i
              className="fas fa-spinner fa-pulse"
              style={{ fontSize: "1rem" }}
            />
          ) : (
            ""
          )}

          {this.state.favs.length === 0 ? (
            <p className="Favs-message">
              No saved quotes yet, you can add them by using a "+" button
            </p>
          ) : (
            this.state.favs.map((q, idx) => (
              <div key={idx}>
                <div className="close">
                  <i
                    className="fa fa-times"
                    onClick={(e)=>this.deleteEntry(q._id)}
                  ></i>
                </div>
                <SavedQuote
                  qid={q.content["0"].id}
                  id={q._id}
                  text={q.content["0"].text}
                  author={q.content["0"].author}
                  source={q.content["0"].source}
                  //   update={props.updateEntry}
                  nums_of_comms={q.comments ? q.comments.length : 0}
                />
              </div>
            ))
          )}
        </div>
      </>
    );
  }
}
