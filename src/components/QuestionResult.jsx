import React from 'react';
import {observer} from 'mobx-react';

import {Notification} from 'react-bulma-components/full';


@observer
export default class QuestionResult extends React.Component {
    render() {
        if (!this.props.show)
            return null;
        
        if (this.props.success) {
            return (
                <Notification color="success">
                    Correct! That was {this.props.correctAnswer}
                </Notification>
            );
        }
        else {
            return (
                <Notification color="danger">
                    Incorrect! That was {this.props.correctAnswer}
                </Notification>
            );
        }
    }
}
