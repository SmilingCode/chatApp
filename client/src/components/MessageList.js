import React from 'react';

class MessageList extends React.Component {

    render() {
        return (

            <ul>
                {
                    this.props.messages.map((message, index) => (
                        <li key={index}>
                            <p>{message.senderId}</p>
                            <p>{message.text}</p>
                        </li>
                    ))
                }
            </ul>

        )
    }
}

export default MessageList;
