import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Router, Route, Switch} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';

import QuestionResult from './QuestionResult';
import TakeQuiz from './TakeQuiz';
import CreateQuiz from './CreateQuiz';

import {history} from '../stores/RouterStore';
import Logo from '../img/logo.svg';

@inject('router', 'form', 'quiz')
@observer
export default class Page extends Component {

    render() {
        console.log(Logo);
        const {router, form, quiz} = this.props;
        return (
            <Router history={history}>
                <div>
                    <QuestionResult
                        show={this.props.quiz.showSnackbar}
                        success={this.props.quiz.lastCorrect}
                        correctAnswer={this.props.quiz.lastCard}
                    />
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                <strong>Battle of Wits</strong>: The Magic Quiz
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    <Grid
                        justify={'center'}
                        alignItems={'center'}
                        container
                    >
                        <Grid item
                              style={{
                                  maxWidth: '600px'
                              }}
                        >
                            <Switch>
                                <Route path="/quiz" component={TakeQuiz}/>
                                <Route path="/" component={CreateQuiz}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </Router>
        );
    }

    setQuery(query) {
        this.props.quiz.startQuiz({query: query, prompt: 'image'});
    }
}
