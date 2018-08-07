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
import TextField from '@material-ui/core/TextField';

import {MoonLoader, GridLoader} from 'react-spinners';

import quizStore from '../stores/QuizStore';

@observer
export default class Question extends React.Component {
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

        if (!this.props.card)
            art = (
                <Level.Item>
                    <GridLoader/>
                </Level.Item>
            );
        else if ('card_faces' in this.props.card) {
            art = (
                <div>
                    {this.props.card.card_faces.map(face => {
                        return <Image width={626} height={457} src={face.image_uris.art_crop}/>;
                    })}
                </div>
            );
        }
        else
            art = (
                <Image noLazyLoad={true} width={626} height={457} src={this.props.card.image_uris.art_crop}/>
            );

        return (
            <Card ref={this.container}>
                <CardHeader title="What is this card?"/>
                <CardMedia style={{
                    height: 457,
                    width: 626
                }} image={this.props.card.image_uris.art_crop}/>
                <form onSubmit={this.submit.bind(this)}>
                    <Grid spacing={16} container justify={'center'} alignItems={'center'}>
                        <FormControl>
                            <Input label={'Answer'}/>
                        </FormControl>
                        <Button onClick={this.submit.bind(this)} variant="contained" color="primary">Submit</Button>
                    </Grid>
                </form>
                <CardActions>
                </CardActions>
                {/*<Card.Footer>*/}
                {/*<Card.Footer.Item>*/}
                {/*<Form.Field kind="addons">*/}
                {/*<Form.Control>*/}
                {/*<Form.Input value={this.state.answer} onChange={this.answerChanged.bind(this)}*/}
                {/*type="text"/>*/}
                {/*</Form.Control>*/}
                {/*<Form.Control>*/}
                {/*<Button submit={true} color='info'>Submit</Button>*/}
                {/*</Form.Control>*/}
                {/*</Form.Field>*/}
                {/*</Card.Footer.Item>*/}
                {/*/!*<Card.Footer.Item  renderAs="a" href="#">*!/*/}
                {/*/!*Submit*!/*/}
                {/*/!*</Card.Footer.Item>*!/*/}
                {/*</Card.Footer>*/}
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
