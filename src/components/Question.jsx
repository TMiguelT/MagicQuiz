import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Image from 'react-graceful-image';

import store from '../stores/QuizStore';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import quizStore from '../stores/QuizStore';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    }
});

@observer
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {answer: ''};
    }

    componentDidUpdate() {
        if ('scollIntoView' in this.container.current)
            this.container.current.scrollIntoView();
    }

    render() {

        let art;

        if ('card_faces' in this.props.card) {
            art = this.props.card.card_faces[0].image_uris.art_crop;
        }
        else
            art = this.props.card.image_uris.art_crop;

        return (
            <Card ref={this.container}>
                <CardHeader title="What is this card?"/>
                <CardMedia style={{
                    height: 457,
                    width: 626
                }} image={art}/>
                <CardContent>
                    <form onSubmit={this.submit.bind(this)}>
                        <Grid spacing={16} container justify={'center'} alignItems={'center'}>
                            <div>
                                <FormControl className={this.props.classes.formControl}>
                                    <InputLabel htmlFor="name-simple">Name</InputLabel>
                                    <Input label={'Answer'}/>
                                </FormControl>
                                <Button onClick={this.submit.bind(this)} variant="contained"
                                        color="primary">Submit</Button>
                            </div>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );

    }

    answerChanged(event) {
        this.setState({answer: event.target.value});
    }

    submit(event) {
        this.setState({answer: ''});
        const correct = this.state.answer.toLowerCase() === this.props.card.name.toLowerCase();
        quizStore.giveAnswer(correct);

        event.preventDefault();
    }
}

export default withStyles(styles)(Question);
