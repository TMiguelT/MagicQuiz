import React from 'react';
import {observer} from 'mobx-react';

import {Button, Box, Level, Card} from 'react-bulma-components/full';

@observer
export default class Form extends React.Component {

    render() {
        return (
            <Card>
                <Card.Content>
                <Level>
                    <Level.Item>
                        Question: {this.props.questionNumber} / 10
                    </Level.Item>
                    <Level.Item>
                        Score: {this.props.points}
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
