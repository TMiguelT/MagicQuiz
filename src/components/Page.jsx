import React, {Component} from "react";
import {observer} from "mobx-react";

import QuizForm from "./Form";
import Question from "./Question";
import Score from "./Score";
import Presets from "./Presets";
import QuestionResult from "./QuestionResult";
import QuizResult from "./QuizResult";
import quizStore from "../stores/QuizStore";

import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import {MoonLoader, GridLoader} from "react-spinners";
// import Section from 'react-bulma-components/lib/components/section';
// import Container from 'react-bulma-components/lib/components/container';

// import 'react-bulma-components/src/index.sass'
// import {Level, Section, Container, Heading, Box, Columns, Tile} from "react-bulma-components/full";

@observer
export default class Page extends React.Component {

    render() {
        let content;

        switch (this.props.store.quizState) {
            case "setup":
                content = (
                    <div>
                        <QuizForm/>
                        <Level/>
                        <Level>
                            <Level.Item>
                                or
                            </Level.Item>
                        </Level>
                        <Presets/>
                    </div>
                );

                break;
            case "loading":
                let prog;
                if (this.props.store.totalCards === 0)
                    prog = <CircularProgress variant='indeterminate'/>;
                else
                    prog = <CircularProgress value={this.props.store.percentLoaded} variant='determinate'/>;

                content = prog;

                break;
            case "started":
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
            case "finished":
                content = (
                    <QuizResult scorePercent={this.props.store.successProportion * 100}
                                onReset={this.props.store.resetQuiz.bind(this.props.store)}/>
                );
                break;
        }

        return (
            <div>
                <Section>
                    <Container>
                        <Level>
                            <Level.Item>
                                <Heading size={1}>
                                    Magic Art Quiz
                                </Heading>
                            </Level.Item>
                        </Level>
                        <Level>
                            <Level.Item>
                                {content}
                            </Level.Item>
                        </Level>
                    </Container>
                </Section>
            </div>
        );
    }

    setQuery(query) {
        quizStore.startQuiz({query: query, prompt: "image"});
    }
}
