import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import InputPreview from '../../components/InputPreview';
import * as messagesAction from '../../actions/message';

type Props = {
    message: '',
    dispatch: () => void,
    getMessages: () => void,
};

class HomeContainer extends Component<Props> {
    _onChange = value => {
        this.props.getMessages(value);
    };

    render() {
        const { message } = this.props;

        return (
            <div>
                <InputPreview value={message} onChange={this._onChange} />
                <Link to="/about">
                    <button>Go to About</button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ message: { message } }) => ({
    message,
});

const mapDispatchToProps = dispatch => ({
    getMessages: bindActionCreators(messagesAction.setMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
