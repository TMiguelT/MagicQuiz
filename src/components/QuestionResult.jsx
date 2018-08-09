import React from 'react';
import {observer} from 'mobx-react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Notification} from 'react-bulma-components/full';


@observer
export default class QuestionResult extends React.Component {
    render() {
        if (!this.props.show)
            return null;
        
        let message;
        if (this.props.success) {
            message = `Correct! That was ${this.props.correctAnswer}`;
        }
        else {
            message = `Incorrect! That was ${this.props.correctAnswer}`;
        }
        
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={true}
                autoHideDuration={6000}
                message={<span id="message-id">{message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}
