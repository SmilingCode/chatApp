import React from 'react'
import OnlineUser from './OnlineUser';

class UserList extends React.Component {

    render() {
        return (
            <div style={{width: '32%', backgroundColor: 'tomato'}}>
                <h2>Who's online list</h2>
                <OnlineUser onlineUsers={this.props.users} />
            </div>
        )
    }
}

export default UserList;
