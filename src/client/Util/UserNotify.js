import React, { Component } from 'react'

class UserNotify extends Component {
    render() {
        return (
            <p className="userNotify">{this.props.message}</p>
        )
    };
}

export default UserNotify;