import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import "./QList.css";
import Quote from './Quote';
import PopUp from './PopUp';
import About from './About';

export default class QList extends Component {
    static defaultProps = {
        numQuotesToGet: 10
    }

    constructor(props) {
        super(props);
        this.addThis = this.addThis.bind(this);
        this.state = {
            quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]"),
            selected: [],
            dupe: false,
        };
        this.seenQuotes = new Set(this.state.quotes.map(q => q.id));
    }

    componentDidMount() {
        if (this.state.quotes.length === 0) {
            this.props.toggleLoading(),
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
                    quotes: [...st.quotes, ...quotes],
                }),
                () => window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
            );
            this.props.toggleLoading();
        } catch (err) {
            alert(err);
        }
    }

    handleClick = () => {
        this.props.toggleLoading();
        this.fetchQuotes();
    }

    addThis(id) {
        console.log("posting to", process.env.REACT_APP_SERVER)
        const repsonse = axios.get(`${process.env.REACT_APP_SERVER}/api/entries`)
            .then(res => {
                let dbIndexes = new Set(res.data.map(i => i.content[0].id))
                const selectedQuote = this.state.quotes.filter(q => q.id == id);
                const qid = selectedQuote[0].id
                this.props.togglePop()
                if (!dbIndexes.has(qid)) {
                    // console.log("grabbed quote", selectedQuote, qid, dbIndexes)
                    axios.post(`${process.env.REACT_APP_SERVER}/api/entries`,
                        {
                            content: selectedQuote, comments: []
                        },
                        this.setState({ dupe: false }), this.props.getFavs()
                    )
                } else {
                    this.setState({ dupe: true })
                    console.log("you have alreay saved this quote", qid)
                }
            })
    }

    render() {
        let idx = uuidv4();
        let color1 = "#8a0303";
        return (
            <div className="QList">
                <div className="QList-sidebar">
                    <img className="image1" src="images/logo.jpg" alt="logo" />
                    {/* {this.props.loading ? <i className="fas fa-spinner fa-pulse" style={{ fontSize: '1rem' }}></i>
                        : */}
                    <button onClick={this.handleClick} className="getmore" >get more quotes</button>
                    {/* } */}
                </div>
                <div className="QList-words">
                    {this.props.modal ? <PopUp dupe={this.state.dupe} togglePop={this.props.togglePop} autoClose={true} /> : null}
                    {this.props.loading
                        ? <About loading={this.props.loading} />
                        :
                        this.state.quotes.map((j, idx) => (
                            <Quote
                                key={idx}
                                id={j.id}
                                text={j.text}
                                author={j.author}
                                source={j.source}
                                addThis={this.addThis}
                            />
                        ))}
                </div>
            </div>
        )
    }
}
