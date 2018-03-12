import React, { Component } from 'react';

type Props = {
    value: '',
    onChange: () => void,
};

export default class InputPreview extends Component<Props> {
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                />
            </div>
        );
    }
}
