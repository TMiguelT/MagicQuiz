import React from 'react';
import {observer} from 'mobx-react';

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

@observer
export default class Form extends React.Component {

    render() {
        return (
            <Card ref={this.container}>
                <CardContent>
                <Grid container justify={"space-around"} alignContent={"center"}>
                    <p> Question: {this.props.questionNumber} / {this.props.quizLength} </p>
                    <p> Score: {this.props.points} </p>
                </Grid>
                </CardContent>
                <CardActions>
                    <Button onClick={this.props.onReset}>
                    Reset
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
