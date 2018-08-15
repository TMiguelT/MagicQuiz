import React from 'react';
import {observer} from 'mobx-react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';

import shuffle from 'lodash.shuffle';

import store from '../stores/QuizStore';

const presetQuizzes = [
    // Format questions
    {
        description: 'Cards banned in legacy',
        query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/',
        length: 10,
        clues: ['image']
    },
    {
        description: 'Cards banned in modern',
        query: 'banned:modern',
        length: 10,
        clues: ['image']
    },
    {
        description: 'Cards banned in standard',
        query: 'banned:standard',
        length: 10,
        clues: ['image']
    },

    // Per-colour questions
    {
        description: 'Black discard spells',
        query: '@@ o:/reveal.*choose.*discard/ c:b t:sorcery not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Red burn spells',
        query: '@@ t:instant c:r o:damage o:"any target" not:funny not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Green ramp spells',
        query: '@@ c:g o:/search your library for.*land.*onto the battlefield/ not:permanent -o:/sacrifice.*land/ not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Blue counterspells',
        query: '@@ c:u o:"counter target" t:instant not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'White exile spells',
        query: '@@ c:w o:/exile target (creature|permanent)/ (t:instant or t:sorcery) -o:/return.*to the battlefield/ not:funny',
        length: 10,
        clues: ['image']
    },

    // Block questions (reverse chronological order)
    {
        description: 'Instant-speed cards from M19 limited',
        query: 's:m19 (t:instant or o:flash) is:booster',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Legendary creatures from Dominaria',
        query: '@@ s:dom t:legendary t:creature',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Dinosaurs from Ixalan block',
        query: 'b:xln t:dinosaur',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Gods from Amonkhet block',
        query: 'b:akh t:god',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Kaladesh-block energy cards',
        query: '@@ o:{E}',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Transform cards from Shadows over Innistrad',
        query: '@@ b:soi is:transform',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Cards with Devoid',
        query: '@@ o:devoid b:bfz',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Mythics from Magic Origins',
        query: '@@ r:mythic s:ori',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Multicolored cards from Khans',
        query: '@@ c:m b:ktk',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Theros commons',
        query: '@@ r:common s:THS',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Maze Runners from Dragon\'s Maze',
        query: '@@ s:dgm t:legendary t:creature',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Landfall cards',
        query: '@@ o:landfall',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Rares from Ravnica',
        query: 'r:rare s:rav is:booster',
        length: 10,
        clues: ['image']
    },

    // Misc questions
    {
        description: 'All prints of the Shocklands',
        query: '@@is:shockland',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Modern legal cards worth more than $50 USD',
        query: 'f:modern usd>50',
        length: 10,
        clues: ['image']
    },

    {
        description: '3+ coloured legendary creatures',
        query: 'c>2 t:creature t:legendary not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Merfolk from all parts of Magic',
        query: '@@ t:creature t:merfolk not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Buy-a-Box promos',
        query: '@@ is:buyabox',
        length: 10,
        clues: ['image']
    },

    {
        description: 'Textless player rewards promos',
        query: '@@ st:player_rewards',
        length: 10,
        clues: ['image']
    },

    {
        description: 'All rare lands in Magic',
        query: '@@r:rare t:land not:funny',
        length: 10,
        clues: ['image']
    },

    {
        description: 'All planeswalkers in Magic',
        query: '@@ t:planeswalker not:funny',
        length: 10,
        clues: ['image']
    },
];

const presetSubset = shuffle(presetQuizzes).slice(0, 10);

@observer
export default class Presets extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title="Choose a preset quiz"/>
                <CardContent>
                    <Typography variant={'body2'}>
                        Can you identify...
                    </Typography>
                    <List>
                        {presetSubset.map(quiz => {
                            return <ListItem button onClick={() => store.startQuiz({
                                query: quiz.query,
                                clues: quiz.clues,
                                quizLength: quiz.length
                            })}>
                                <ListItemIcon>
                                    <PlayArrow/>
                                </ListItemIcon>
                                <Typography variant={'body1'}>
                                    {quiz.description}
                                </Typography>
                            </ListItem>;
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}
