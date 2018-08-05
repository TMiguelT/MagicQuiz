import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Image from 'react-graceful-image';


import {Container, Button, Form, Heading, Columns, Level, Card} from 'react-bulma-components/full';

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
        if (!this.props.card)
            return <div/>;

        let art;
        
        if ('card_faces' in this.props.card) {
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
                <Image width={626} height={457} src={this.props.card.image_uris.art_crop}/>
            );

        return (
            <form onSubmit={this.submit.bind(this)}>
                <Card ref={this.container}>
                    <Card.Header>
                        <Card.Header.Title>
                            What is this card?
                        </Card.Header.Title>
                    </Card.Header>
                    <Card.Content>
                        <Level>
                            {art}
                        </Level>
                    </Card.Content>
                    <Card.Footer>
                        <Card.Footer.Item>
                            <Form.Input value={this.state.answer} onChange={this.answerChanged.bind(this)}
                                        type="text"/>
                        </Card.Footer.Item>
                        <Card.Footer.Item onClick={this.submit.bind(this)} renderAs="a" href="#">
                            Submit
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card>
            </form>
        );

    }

    answerChanged(event) {
        this.setState({answer: event.target.value});
    }

    submit(event) {
        const correct = this.state.answer.toLowerCase() === this.props.card.name.toLowerCase();
        quizStore.giveAnswer(correct);

        event.preventDefault();
    }
}
