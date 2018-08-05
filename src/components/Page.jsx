import React, {Component} from 'react';
import {observer} from 'mobx-react';

import QuizForm from './Form';
import Question from './Question';
import Score from './Score';
import Presets from './Presets';
import QuestionResult from './QuestionResult';

import quizStore from '../stores/QuizStore';

// import Section from 'react-bulma-components/lib/components/section';
// import Container from 'react-bulma-components/lib/components/container';

// import 'react-bulma-components/src/index.sass'
import {Level, Section, Container, Heading, Box, Columns, Tile} from 'react-bulma-components/full';
import IconPopup from './Popup';

@observer
export default class Page extends React.Component {

    render() {
        let content;
        if (this.props.store.started)
            content = (
                <div>
                    <Score
                        points={this.props.store.points}
                        questionNumber={this.props.store.questionNumber}
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

        else
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

        return (
            <div>
                {/*<IconPopup show={this.props.store.showPopup}*/}
                {/*icon={this.props.store.lastCorrect ? 'correct' : 'incorrect'}/>*/}

                <Section>
                    <Container>
                        <Columns centered={true}>
                            <Columns.Column size={6}>
                                <Level>
                                    <Level.Item>
                                        <Heading size={1}>
                                            Magic Quiz
                                        </Heading>
                                    </Level.Item>
                                </Level>
                                {content}
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </div>
        );
    }

    setQuery(query) {
        quizStore.startQuiz({query: query, prompt: 'image'});
    }
}
