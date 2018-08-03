import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
function mapStateToProps(state) {
    return {

    };
}

class Landing extends Component {
    render() {
        return (
            <div className="landing-box center-align">
            <h1 className="">Reactify</h1>   
            <a class="btn-large">Create a game</a>
            <a class="btn-large">Join a game</a>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Landing);