import React from 'react';
import Chatkit from '@pusher/chatkit-client';

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:b18b6343-0325-4d0d-8648-eb9b46dd1cba',
            userId: this.props.currentUserName,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/auth'
            })
        })

        chatManager.connect()
        .then(currentUser => console.log('currentUser: ', currentUser))
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                welcome {this.props.currentUserName} !!
            </div>
        )
    }
}

export default ChatScreen;
