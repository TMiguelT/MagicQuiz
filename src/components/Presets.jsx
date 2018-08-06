import React from 'react';
import {observer} from 'mobx-react';

import {Button, Box, Level, Card, Tile} from 'react-bulma-components/full';

import store from '../stores/QuizStore';

@observer
export default class Form extends React.Component {

    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Header.Title>
                        Choose a preset quiz
                    </Card.Header.Title>
                </Card.Header>
                <Card.Content>
                    Can you...
                    <Tile kind={'ancestor'}>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 'r:rare s:rav',
                                prompt: 'image',
                                quizLength: 10
                            })}>
                                Identify rares from Ravnica?
                            </Tile>
                        </Tile>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/',
                                prompt: 'image',
                                quizLength: 10
                            })}>
                                Identify cards banned in legacy?
                            </Tile>
                        </Tile>
                    </Tile>
                    <Tile kind={'ancestor'}>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 's:m19 (t:instant or o:flash) is:booster',
                                prompt: 'image',
                                quizLength: 10
                            })}>
                                Identify the instant-speed cards from M19?
                            </Tile>
                        </Tile>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 'is:shockland',
                                prompt: 'image',
                                quizLength: 10
                            })}>
                                Identify all Shocklands?
                            </Tile>
                        </Tile>
                    </Tile>
                </Card.Content>
            </Card>
        );
    }
}
