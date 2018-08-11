import React from "react";
import {observer} from "mobx-react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";

@observer
export default class QuestionResult extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (!prevProps.show && this.props.show){
            // If the snackbar just opened, set a timer to close it
            this.setState({
                timeout: window.setTimeout(() => {this.handleClose()}, 3000)
            })
        }
        else if (prevProps.show && !this.props.show){
            // If the snackbar just closed, reset the timer
            window.clearTimeout(this.state.timeout)
        }
    }

    render() {
        let message;
        let colour;
        if (this.props.success) {
            message = (
                <Grid container alignItems={"center"}>
                    <CheckCircleIcon style={{
                        marginRight: 10
                    }}/>
                    Correct! That was {this.props.correctAnswer}
                </Grid>
            );
            colour = green[600];
        }
        else {
            message = (
                <Grid container alignItems={"center"}>
                    <ErrorIcon style={{
                        marginRight: 10
                    }}/>
                    Incorrect! That was {this.props.correctAnswer}
                </Grid>
            );
            colour = red[600];
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={this.props.show}
                autoHideDuration={6000}
            >
                <SnackbarContent
                    message={message}
                    onClose={this.handleClose.bind(this)}
                    action={[
                        <IconButton
                            onClick={this.handleClose.bind(this)}
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

    handleClose(){
        this.props.onClose()
    }
}
