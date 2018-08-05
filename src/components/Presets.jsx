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
                                query: 'r:rary s:rav',
                                prompt: 'image'
                            })}>
                                Identify rares from Ravnica?
                            </Tile>
                        </Tile>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/',
                                prompt: 'image'
                            })}>
                                Identify cards banned in legacy?
                            </Tile>
                        </Tile>
                    </Tile>
                    <Tile kind={'ancestor'}>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 's:m19 (t:instant or o:flash)',
                                prompt: 'image'
                            })}>
                                Identify the instant-speed cards from M19?
                            </Tile>
                        </Tile>
                        <Tile kind={'parent'} vertical={true}>
                            <Tile kind={'child'} renderAs="a" className={'box'} onClick={() => store.startQuiz({
                                query: 'is:shockland',
                                prompt: 'image'
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
