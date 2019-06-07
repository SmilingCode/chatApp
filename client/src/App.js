import React from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUserName: '',
            currentScreen: 'WhatIsYourUsernameScreen'
        }

        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
    }

    alertUsername(name) {
        alert(name)
    }

    onUsernameSubmitted(username) {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username})
        }).then(response => {
            console.log('success');
            this.setState({
                currentUserName: username,
                currentScreen: 'ChatScreen'
            })
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
            return (
                <UsernameForm onSubmit={this.onUsernameSubmitted} />
            )
        } else {
            return (
                <ChatScreen currentUserName= {this.state.currentUserName}/>
            )
        }

    }
}

export default App;
