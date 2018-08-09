import React, {Component} from 'react';
import {observer} from 'mobx-react';

import QuizForm from './Form';
import Question from './Question';
import Score from './Score';
import Presets from './Presets';
import QuestionResult from './QuestionResult';
import QuizResult from './QuizResult';
import quizStore from '../stores/QuizStore';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';

@observer
export default class Page extends React.Component {

    render() {
        let content;

        switch (this.props.store.quizState) {
            case 'setup':
                content = (
                    <div>
                        <Grid container justify={'center'} direction={'column'} spacing={16}>
                            <Grid item>
                                <QuizForm/>
                            </Grid>
                            <Grid item>
                                <Presets/>
                            </Grid>
                        </Grid>
                    </div>
                );

                break;
            case 'loading':
                let prog;
                if (this.props.store.totalCards === 0)
                    prog = <CircularProgress variant='indeterminate'/>;
                else
                    prog = <CircularProgress value={this.props.store.percentLoaded} variant='determinate'/>;

                content = prog;

                break;
            case 'started':
                content = (
                    <div>
                        <Score
                            points={this.props.store.numCorrect}
                            questionNumber={this.props.store.questionNumber + 1}
                            quizLength={this.props.store.quizLength}
                            onReset={this.props.store.resetQuiz.bind(this.props.store)}
                        />
                        <br/>
                        <QuestionResult
                            show={this.props.store.hasAnswered}
                            success={this.props.store.lastCorrect}
                            correctAnswer={this.props.store.lastName}
                        />
                        <Question card={this.props.store.currentQuestion}/>
                    </div>
                );
                break;
            case 'finished':
                content = (
                    <QuizResult scorePercent={this.props.store.successProportion * 100}
                                onReset={this.props.store.resetQuiz.bind(this.props.store)}/>
                );
                break;
        }

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Magic Art Quiz
                        </Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <Grid direction={'column'} justify={'center'} alignItems={'center'} container>
                    <Grid item>
                        {content}
                    </Grid>
                </Grid>
            </div>
        );
    }

    setQuery(query) {
        quizStore.startQuiz({query: query, prompt: 'image'});
    }
}
