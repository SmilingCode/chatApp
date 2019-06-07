import React from 'react';

class MessageList extends React.Component {

    render() {
        return (
            <div style={{display: 'flex', width: '100%', height: '80vh', overflow: 'scroll'}}>
                <ul style={{margin: 0}}>
                    {
                        this.props.messages.map((message, index) => (
                            <li key={index}>
                                <p>{message.senderId}</p>
                                <p>{message.text}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default MessageList;
