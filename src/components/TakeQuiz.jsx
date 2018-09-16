import Question from "./Question";
import Score from "./Score";
import QuizResult from "./QuizResult";
import React, {Component} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

import {observer, inject} from 'mobx-react';

@inject('quiz')
@observer
export default class TakeQuiz extends Component {
    render() {
        switch (this.props.quiz.quizState) {
            case 'loading':
                if (this.props.quiz.totalCards === 0)
                    return <CircularProgress variant='indeterminate'/>;
                else
                    return <CircularProgress value={this.props.quiz.percentLoaded} variant='determinate'/>;
            case 'started':
                return (
                    <div>
                        <Score
                            points={this.props.quiz.numCorrect}
                            questionNumber={this.props.quiz.questionNumber + 1}
                            quizLength={this.props.quiz.quizLength}
                            onReset={this.props.quiz.resetQuiz.bind(this.props.quiz)}
                        />
                        <br/>
                        <Question clues={this.props.quiz.clues} card={this.props.quiz.currentQuestion}/>
                    </div>
                );
            case 'finished':
                return (
                    <QuizResult
                        scorePercent={this.props.quiz.successProportion * 100}
                        onReset={this.props.quiz.resetQuiz.bind(this.props.quiz)}
                        answers={this.props.quiz.answers}
                        cards={this.props.quiz.cards}
                        correctAnswers={this.props.quiz.correctAnswers}
                    />
                );
            default:
                return null;
        }
    }
}