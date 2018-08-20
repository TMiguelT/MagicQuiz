import React from 'react';
import {observer} from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';

@observer
export default class QuestionResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the question has changed, show the popup
        if (this.props.correctAnswer !== prevProps.correctAnswer && this.props.correctAnswer) {
            this.setState({
                showSnackbar: true
            });
        }
    }

    closeSnackbar() {
        this.setState({
            showSnackbar: false
        });
    }

    render() {
        const {correctAnswer} = this.props;
        let message;
        let colour;

        if (!correctAnswer) {
            message = null;
        }
        else if (this.props.success) {
            message = (
                <Grid container alignItems={'center'}>
                    <CheckCircleIcon style={{
                        marginRight: 10
                    }}/>
                    <span>Correct! That was&nbsp;</span>
                    <a href={correctAnswer.scryfall_uri} target="_blank"> {correctAnswer.frontField('name')}</a>
                </Grid>
            );
            colour = green[600];
        }
        else {
            message = (
                <Grid container alignItems={'center'}>
                    <ErrorIcon style={{
                        marginRight: 10
                    }}/>
                    <span>Incorrect! That was&nbsp;</span>
                    <a href={correctAnswer.scryfall_uri} target="_blank"> {correctAnswer.frontField('name')}</a>
                </Grid>
            );
            colour = red[600];
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={this.state.showSnackbar}
                autoHideDuration={5000}
                onClose={this.closeSnackbar.bind(this)}
            >
                <SnackbarContent
                    message={message}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar.bind(this)}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}

                    style={{
                        backgroundColor: colour
                    }}
                />
            </Snackbar>
        );
    }

    handleClose() {
        this.props.onClose();
    }
}
