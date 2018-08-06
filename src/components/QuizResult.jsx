import React from 'react';
import {observer} from 'mobx-react';

import {Button, Box, Level, Card} from 'react-bulma-components/full';

@observer
export default class Form extends React.Component {

    render() {
        let message;
        if (this.props.scorePercent > 50){
            message = `Well done! You guessed ${this.props.scorePercent}% of questions correctly!`
        }
        else{
            message = `Bad luck! You only got ${this.props.scorePercent}% of questions correct`
        }

        return (
            <Card>
                <Card.Header>
                    <Card.Header.Title>
                        Quiz Completed
                    </Card.Header.Title>
                </Card.Header>
                <Card.Content>
                <Level>
                    <Level.Item>
                        {message}
                    </Level.Item>
                </Level>
                </Card.Content>
                <Card.Footer>
                    <Card.Footer.Item onClick={this.props.onReset} renderAs="a" href="#">
                    Reset
                    </Card.Footer.Item>
                </Card.Footer>
            </Card>
        );
    }
}
