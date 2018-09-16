import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';

import QuizForm from './Form';

import {observer, inject} from 'mobx-react';

@inject('form')
@observer
export default class CreateQuiz extends Component {
    render() {
        return (
            <QuizForm form={this.props.form}/>
        );
    }
}