import React, { Component } from 'react';

class GetFace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const author = this.props.author
        function getFace(author) {
            switch (author) {
                case "Marcus Aurelius":
                    return ["https://en.wikipedia.org/wiki/Marcus_Aurelius", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Marcus_Aurelius_Louvre_MR561_n02.jpg/164px-Marcus_Aurelius_Louvre_MR561_n02.jpg"]
                    break;

                case "Seneca":
                    return ["https://en.wikipedia.org/wiki/Seneca_the_Younger", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/170px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG"]

                    break;
                case "Epictetus":
                    return ["https://en.wikipedia.org/wiki/Epictetus", "https://3quarksdaily.com/wp-content/uploads/2019/04/Crito-1a-259x360.jpg"]
                    break;
            }
        }

        return (
            <div className="face">
                <a href={getFace(author)[0]}>
                    <img src={getFace(author)[1]} alt={author} />
                </a>
            </div>

        )

    }
}


export default GetFace;