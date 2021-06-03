import React, { Component } from 'react';
import Joke from './Joke';
import "./JokeList.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@reach/router';
import PopUp from './PopUp';
import About from './About';


export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.addThis = this.addThis.bind(this);
        this.togglePop = this.togglePop.bind(this)
        this.state = {
            quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]"),
            selected: [], loading: false, modal: false, dupe: false,
        };
        this.seenQuotes = new Set(this.state.quotes.map(q => q.id));

    }
    componentDidMount() {
        if (this.state.quotes.length === 0){
                this.setState({loading:true}),
                this.fetchQuotes();
        }
    }

    async fetchQuotes() {
        try {
            let quotes = [];
            while (quotes.length < this.props.numJokesToGet) {
                let res = await axios.get("https://stoic-server.herokuapp.com/random");
                let rez = res.data[0]
                console.log(res)
                if (!this.seenQuotes.has(rez.id)) {

                    quotes.push({ text: rez.body, author: rez.author, source: rez.quotesource, id: rez.id });
                } else {
                    console.log("****************duplicate found ****************",
                        // rez.body, 
                        res.id
                    )
                }
            }
            console.log(quotes);
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
        this.fetchQuotes();
    }

    togglePop() { //if u change this to reg function it breaks
        this.setState({
            modal: false
        });
        console.log("seen state flip")
    }



    addThis(id) {
        const repsonse = axios.get('http://localhost:8000/api/entries')
            .then(res => {
                let dbIndexes = new Set(res.data.map(i => i.content[0].id))
                // console.log("is a set now", this.state.compare)
                const selectedQuote = this.state.quotes.filter(q => q.id == id);
                const qid = selectedQuote[0].id
                if (!dbIndexes.has(qid)) {
                    console.log("grabbed quote", selectedQuote, qid, dbIndexes)
                    // if()
                    axios.post('http://localhost:8000/api/entries', {
                        content: selectedQuote, comments:[]
                    }, this.setState({ modal: true, dupe: false }))
                } else {
                    this.setState({ modal: true, dupe: true })
                    console.log("you alreay saved the quote", qid)
                }
            })
    }

    render() {
        let idx = uuidv4();
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <img className="image1" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Paolo_Monti_-_Servizio_fotografico_%28Napoli%2C_1969%29_-_BEIC_6353768.jpg/551px-Paolo_Monti_-_Servizio_fotografico_%28Napoli%2C_1969%29_-_BEIC_6353768.jpg' />
                    <button className="getmore" onClick={this.handleClick}>
                        {this.state.loading ? <i className="fas fa-spinner fa-pulse" style={{ fontSize: '1rem' }}></i> : "Add More Quotes"}
                    </button>
                    <Link to="/favs/" style={{ color: "grey", marginTop: "5px" }}><i className="fas fa-scroll"></i></Link>
                    <Link to="/about/" className="JokeList-title">Stoic Companion</Link>
                    <img className="image2" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRU6ZSTPKlIUtGlPVpPlu4oKJT5ae-ycI0WA&usqp=CAU' />
                </div>
                <div className="JokeList-jokes">
                    {this.state.modal ? <PopUp dupe={this.state.dupe} togglePop={this.togglePop} /> : null}
                    {this.state.loading 
                    ? <About loading={this.state.loading}/>
                    :
                    this.state.quotes.map((j, idx) => (
                        <Joke
                            key={idx}
                            togglePop={this.togglePop}
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
