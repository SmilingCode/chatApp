import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import UserList from './UserList';

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
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
        // currentUser.sendMessage/currentUser.isTypingIn
        .then(currentUser => {
            //console.log('currentUser: ', currentUser)
            this.setState({
                currentUser
            })
            return currentUser.subscribeToRoom({
                roomId: '19877933',
                hooks: {
                    // get all messages
                    onMessage: message => {
                        //console.log('Received message:', message.text)
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    },
                    // get users who started typing
                    onUserStartedTyping: user => {
                        //console.log(user.name, ' started typing...');
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                        })
                    },
                    // get users who stopped typing
                    onUserStoppedTyping: user => {
                        //console.log(user.name, ' stopped typing...');
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                // only save the users who's user.name not here
                                username => username !== user.name
                            )
                        })
                    },
                    onUserCameOnline: () => this.forceUpdate(),
                    onUserWentOffline: () => this.forceUpdate(),
                    // new user joined to this room(roomId)
                    onUserJoined: () => this.forceUpdate()
                },
                messageLimit: 100
            })
            // currentRoom.users
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
        .catch(err => {
            console.error('error', err);
        })
    }

    sendTypingEvent() {
        this.state.currentUser.isTypingIn({
            roomId: this.state.currentRoom.id
        })
    }

    render() {
        return (
            <div style={{display: 'flex', height: '100vh'}}>
                <UserList users={this.state.currentRoom.users} />
                <MessageList messages={this.state.messages} />
                <TypingIndicator typing={this.state.usersWhoAreTyping} />
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
            </div>
        )
    }
}

export default ChatScreen;
