import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper amber darken-2 ">
                    <a  class="brand-logo center black-text "><b>Reactify</b></a>
                </div>
            </nav>
        );
    }
}

export default connect(
    mapStateToProps,
)(Header);