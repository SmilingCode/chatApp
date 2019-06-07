import React from 'react';

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        })

        this.props.onChange()
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="your text?"
                    value={this.state.text}
                    onChange={this.onChange} />
                <button>Submit</button>
            </form>
        )
    }
}

export default SendMessageForm;
