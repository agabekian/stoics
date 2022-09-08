import React, { Component } from 'react';
import { Link } from '@reach/router';
import { v4 as uuidv4 } from 'uuid';
import "./QList.css";
import Quote from './Quote';
import PopUp from './PopUp';
import About from './About';
import axios from 'axios';

export default class QList extends Component {
    static defaultProps = {
        numQuotesToGet: 10
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.toggleAbout = this.toggleAbout.bind(this);
        this.addThis = this.addThis.bind(this);
        this.state = {
            quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]"),
            selected: [], loading: false, dupe: false, about: false
        };
        this.seenQuotes = new Set(this.state.quotes.map(q => q.id));

    }
    componentDidMount() {
        if (this.state.quotes.length === 0) {
            this.setState({ loading: true }),
                this.fetchQuotes();
        }
    }

    async fetchQuotes() {
        try {
            let quotes = [];
            while (quotes.length < this.props.numQuotesToGet) {
                let res = await axios.get("https://stoic-server.herokuapp.com/random");
                let rez = res.data[0]
                if (!this.seenQuotes.has(rez.id)) {
                    quotes.push({ text: rez.body, author: rez.author, source: rez.quotesource, id: rez.id });
                } else {
                    console.log("****************duplicate found ****************",
                        res.id
                    )
                }
            }

            this.setState(
                st => ({
                    loading: false,
                    quotes: [...st.quotes, ...quotes],
                }),
                () => window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
            );
        } catch (err) {
            alert(err);
        }
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
        this.setState({ loading: true });
        this.setState({ about: false })
        this.fetchQuotes();
    }

    toggleAbout() {
        this.setState({ about: !this.state.about })
    }

    addThis(id) {
        console.log("posting to",process.env.REACT_APP_SERVER)
        const repsonse = axios.get(`${process.env.REACT_APP_SERVER}/api/entries`)
            .then(res => {
                let dbIndexes = new Set(res.data.map(i => i.content[0].id))
                const selectedQuote = this.state.quotes.filter(q => q.id == id);
                const qid = selectedQuote[0].id
                this.props.togglePop()
                if (!dbIndexes.has(qid)) {

                    console.log("grabbed quote", selectedQuote, qid, dbIndexes)
                    // if()
                    axios.post(`${process.env.REACT_APP_SERVER}/api/entries`,
                        {
                            content: selectedQuote, comments: []
                        }, 
                        this.setState({ dupe: false }))
                        console.log(res);
                } else {
                    this.setState({ dupe: true })
                    console.log("you alreay saved the quote", qid)
                }
            })
    }

    render() {
        let idx = uuidv4();
        return (
            <div className="QList">
                <div className="QList-sidebar">
                    <img className="image1" src="images/logo.jpg" alt="logo" />
                    <button className="getmore" onClick={this.handleClick}>
                        {this.state.loading ? <i className="fas fa-spinner fa-pulse" style={{ fontSize: '1rem' }}></i> : <h5>Add More Quotes</h5>}
                    </button>
                    <Link to="/favs/" style={{ color: "#8a0303", marginTop: "25px" }}><i className="fas fa-scroll fa-2x"></i></Link>
                    <div onClick={this.toggleAbout} className="QList-title" style={{fontSize:"24px", marginTop:"45px"}}>stoic companion
                    </div>
                </div>
                <div className="QList-words">
                    {this.state.about ? <About about={this.toggleAbout} /> : ""}
                    {this.props.modal ? <PopUp dupe={this.state.dupe} togglePop={this.props.togglePop} modal={this.state.modal} /> : null}
                    {this.state.loading
                        ? <About loading={this.state.loading} email="armasconi@gmail.com" />
                        :
                        this.state.quotes.map((j, idx) => (
                            <Quote
                                key={idx}
                                id={j.id}
                                // votes={j.votes}
                                text={j.text}
                                author={j.author}
                                source={j.source}
                                addThis={this.addThis}
                            // upvote={() => this.handleVote(j.id, 1)}
                            // downvote={() => this.handleVote(j.id, -1)}
                            />
                        ))}

                </div>
            </div>
        )
    }
}
