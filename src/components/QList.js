import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./QList.css";
import Quote from "./Quote";
import PopUp from "./PopUp";
import Message from "./Message";
import About from "./About";

export default class QList extends Component {
  static defaultProps = {
    numQuotesToGet: 2,
  };

  constructor(props) {
    super(props);
    this.addThis = this.addThis.bind(this);
    this.state = {
      quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]"),
      selected: [],
      dupe: false,
      isLoading: false,
    };
    this.seenQuotes = new Set(this.state.quotes.map((q) => q.id));
  }
  toggleIsLoading = () => {
    console.log("Togggggle")
    this.setState(prevSt=>({isLoading: !prevSt.isLoading}));
  }


  fetchQuotes() {
    let quotes = [];
    let i = 0;
    try {
        // setTimeout(() => {console.log('Hello, World!')}, 3000)
      while (quotes.length < this.props.numQuotesToGet) {
        //0-indexed
        // let res = axios.get(`${process.env.REACT_APP_SERVER}/api/entries`)
        let res = this.props.favs[i];
        // console.log("cur quote",res.text)
        let rez = res;
        if (!this.seenQuotes.has(rez.id)) {
          quotes.push({
            text: rez.text,
            author: rez.author,
            source: rez.source,
            id: rez.id,
          });
          this.seenQuotes.add(rez.id);
        } else {
          i++;
          console.log(
            "****************duplicate found ****************",
            res.id
          );
        }
      }
      this.setState(
        (st) => ({
          quotes: [...st.quotes, ...quotes],
        }),() =>
          window.localStorage.setItem(
            "quotes",
            JSON.stringify(this.state.quotes)
          )
      );
    } catch (err) {
      alert(err);
    }
  }

  componentDidMount() {
    console.log(this.seenQuotes);
    if (this.state.quotes.length === 0) {
        console.log("no data");
        this.fetchQuotes();
    }
  }

  handleClick = () => {
    this.fetchQuotes();
}

  addThis(id) {
    console.log("posting to", process.env.REACT_APP_SERVER);
    const repsonse = axios
      .get(`${process.env.REACT_APP_SERVER}/api/entries`)
      .then((res) => {
        let dbIndexes = new Set(res.data.map((i) => i.content[0].id));
        const selectedQuote = this.state.quotes.filter((q) => q.id == id);
        const qid = selectedQuote[0].id;
        this.props.togglePop();
        if (!dbIndexes.has(qid)) {
          // console.log("grabbed quote", selectedQuote, qid, dbIndexes)
          axios.post(
            `${process.env.REACT_APP_SERVER}/api/entries`,
            {
              content: selectedQuote,
              comments: [],
            },
            this.setState({ dupe: false }),
            this.props.getFavs()
            
          );
        } else {
          this.setState({ dupe: true });
          console.log("you have alreay saved this quote", qid);
        }
      });
  }

  render() {
    let idx = uuidv4();
    let color1 = "#8a0303";

    return (
      <div className="QList">
        <button onClick={this.toggleIsLoading}>LOAD</button>
        <div className="QList-sidebar">
          <img className="image1" src="images/logo.jpg" alt="logo" />
          {/* {this.props.loading ? <i className="fas fa-spinner fa-pulse" style={{ fontSize: '1rem' }}></i>
                        : */}
          <button onClick={this.handleClick} className="getmore">
            get more quotes z
          </button>
        </div>
        <div className="QList-words">
          {this.props.modal ? (
            <PopUp
              dupe={this.state.dupe}
              togglePop={this.props.togglePop}
              autoClose={true}
            />
          ) : null}
          {this.state.isLoading ? (
            <Message />
          ) : (
            this.state.quotes.map((j, idx) => (
              <Quote
                key={idx}
                id={j.id}
                text={j.text}
                author={j.author}
                source={j.source}
                addThis={this.addThis}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
