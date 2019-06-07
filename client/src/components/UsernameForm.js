import React from 'react';

class UsernameForm extends React.Component {
    constructor() {
        super()
        this.state = {
            username: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="your username?"
                    value={this.state.username}
                    onChange={this.onChange} />
                <button>Submit</button>
            </form>
        )
    }
}

export default UsernameForm
