import React, {Component} from 'react';

class Wiki extends Component {
    state = {  } 
    render() { 
        return (
            <iframe width="100%" height="100%" src={this.props.link}  scrolling="yes" ></iframe>

        );
    }
}
 
export default Wiki;