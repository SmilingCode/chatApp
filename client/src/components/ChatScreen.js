import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {}
        }

        this.sendMessage = this.sendMessage.bind(this)
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
        .then(currentUser => {
            console.log('currentUser: ', currentUser)
            this.setState({
                currentUser
            })
            return currentUser.subscribeToRoom({
                roomId: '19877933',
                hooks: {
                    onMessage: message => {
                        console.log('Received message:', message.text)
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    },
                },
            })
        }).then(currentRoom => {
            this.setState({
                currentRoom
            })
        })
        .catch(err => console.error(err))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} />
                <SendMessageForm onSubmit={this.sendMessage} />
            </div>
        )
    }
}

export default ChatScreen;
