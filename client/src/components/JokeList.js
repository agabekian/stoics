import React, { Component } from 'react';
import Joke from './Joke';
import "./JokeList.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]")
        };
    }
    componentDidMount() {
        if (this.state.quotes.length === 0) this.fetchQuotes();
    }

    async fetchQuotes() {
        let quotes = [];
        while (quotes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://stoic-server.herokuapp.com/random");
            // console.log(res)
            quotes.push({ text: res.data["0"].body, author: res.data[0].author, source: res.data[0].quotesource, votes: 0, id: uuidv4() });
        }
        console.log(quotes);
        this.setState(
            st => ({
                quotes: [...st.quotes, ...quotes]
            }),
            () => window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
        );
    }

    handleVote(id, delta) {
        this.setState(
            st => ({
                quotes: st.quotes.map(j =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j
                )
            }), () => window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))

        );
    }
    handleClick() {
        this.fetchQuotes();
    }

    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Paolo_Monti_-_Servizio_fotografico_%28Napoli%2C_1969%29_-_BEIC_6353768.jpg/551px-Paolo_Monti_-_Servizio_fotografico_%28Napoli%2C_1969%29_-_BEIC_6353768.jpg' />
                        <h5 className="JokeList-title">Stoic<span>Companion</span></h5>
                        <button className="getmore" onClick={this.handleClick}>More Quotes</button>
                        {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRU6ZSTPKlIUtGlPVpPlu4oKJT5ae-ycI0WA&usqp=CAU' /> */}
                </div>
                <div className="JokeList-jokes">
                    {this.state.quotes.map(j => (
                        <Joke
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            author={j.author}
                            source={j.source}
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))};
                </div>
            </div>
        );
    }
}
