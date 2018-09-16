import React, {Component} from 'react';

import QuizForm from './Form';

import {observer, inject} from 'mobx-react';
import Grid from '@material-ui/core/Grid/Grid';

@inject('form')
@observer
export default class CreateQuiz extends Component {
    render() {
        return (
            <Grid container justify={'center'} alignItems={'center'}>
            <QuizForm form={this.props.form}/>
            </Grid>
        );
    }
}