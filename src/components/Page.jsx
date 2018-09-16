import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Router, Route, Switch, Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import Button from '@material-ui/core/Button/Button';

import QuestionResult from './QuestionResult';
import TakeQuiz from './TakeQuiz';
import CreateQuiz from './CreateQuiz';
import {history} from '../stores/RouterStore';
import Logo from '../img/logo.svg';
import {title, subtitle} from '../metadata'

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
                    <AppBar position="static" style={{
                        color: 'white'
                    }}>
                        <Toolbar>
                            <Link style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                flexGrow: 1
                            }} to="/">
                                <Typography variant="title" color="inherit">
                                    <strong>{title}</strong>: {subtitle}
                                </Typography>
                            </Link>
                            <Button color='inherit' href='https://github.com/TMiguelT/MagicQuiz'>
                                View on GitHub
                                <FontAwesomeIcon style={{
                                    marginLeft: '10px'
                                }} size={'lg'} color={'white'} icon={faGithub}/>
                            </Button>
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
                                  width: '100%',
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
}
