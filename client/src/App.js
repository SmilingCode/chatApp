import React from 'react';
import UsernameForm from './components/UsernameForm'

class App extends React.Component {

    alertUsername(name) {
        alert(name)
    }

    render() {
        return (
            <UsernameForm onSubmit={this.alertUsername} />
        )
    }
}

export default App;
