import Grid from "@material-ui/core/Grid";
import React, {Component} from 'react';

import QuizForm from './Form';
import Presets from './Presets';

import {observer, inject} from 'mobx-react';

@inject('form')
@observer
export default class CreateQuiz extends Component {
    render() {
        return (
            <div>
                <Grid container justify={'center'} direction={'column'} spacing={16}>
                    <Grid item>
                        <QuizForm form={this.props.form}/>
                    </Grid>
                    <Grid item>
                        <Presets form={this.props.form}/>
                    </Grid>
                </Grid>
            </div>
        );

    }
}