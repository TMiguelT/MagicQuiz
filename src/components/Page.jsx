import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Router, Route} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import QuestionResult from './QuestionResult';
import TakeQuiz from './TakeQuiz';
import CreateQuiz from './CreateQuiz';

import createBrowserHistory from 'history/createBrowserHistory';
import {syncHistoryWithStore} from 'mobx-react-router';


@inject('router', 'form', 'quiz')
@observer
export default class Page extends Component {

    render() {
        const {router, form, quiz} = this.props;
        const browserHistory = createBrowserHistory();
        const history = syncHistoryWithStore(browserHistory, router);
        return (
            <Router history={history}>
                <div>
                    <QuestionResult
                        show={this.props.quiz.showSnackbar}
                        success={this.props.quiz.lastCorrect}
                        correctAnswer={this.props.quiz.lastCard}
                    />
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Magic Art Quiz
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
                            <Route path="/" component={CreateQuiz}/>
                            <Route path="/quiz" component={TakeQuiz}/>
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
