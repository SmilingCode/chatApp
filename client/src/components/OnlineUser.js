import React from 'react';

class OnlineUser extends React.Component {
    render() {
        console.log('this.props.onlineUsers', this.props.onlineUsers);
        if (this.props.onlineUsers) {
            return (
                <ul>
                    {
                        this.props.onlineUsers.map((user, index) => {
                            return (
                                <li key={index}>{user.name} ({user.presence.state})</li>
                            )
                        })
                    }
                </ul>
            )
        } else{
            return (
                <p>loading...</p>
            )
        }
    }
}

export default OnlineUser;
