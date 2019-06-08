import React from 'react';

class TypingIndicator extends React.Component {

    render() {
        if (this.props.typing.length === 0) {
            // <div>
            return (
                <div></div>
            )
        } else if (this.props.typing.length === 1) {
            return (
                <div>
                    {this.props.typing[0]} is typing...
                </div>
            )
        } else {
            return (
                <div>
                    {this.props.typing.join(' and ')} are typing...
                </div>
            )
        }
    }
}

export default TypingIndicator;
