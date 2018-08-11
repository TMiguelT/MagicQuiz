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

import store from '../stores/QuizStore';

const presetQuizzes = [
    // Format questions
    {
        description: "cards banned in legacy",
        query: "banned:legacy -o:ante -t:conspiracy -o:/flip ~/",
        length: 10
    },
    {
        description: "cards banned in modern",
        query: "banned:modern",
        length: 10
    },
    {
        description: "cards banned in standard",
        query: "banned:standard",
        length: 10
    },

    // Per-colour questions
    {
        description: "black discard spells",
        query: "++ o:/reveal.*choose.*discard/ c:b t:sorcery not:funny",
        length: 10
    },

    {
        description: "red burn spells",
        query: '++ t:instant c:r o:damage o:"any target" not:funny not:funny',
        length: 10
    },

    {
        description: "green ramp spells",
        query: '++ c:g o:/search your library for.*land.*onto the battlefield/ not:permanent -o:/sacrifice.*land/ not:funny',
        length: 10
    },

    {
        description: "blue counterspells",
        query: '++ c:u o:"counter target" t:instant not:funny',
        length: 10
    },

    {
        description: "white exile spells",
        query: '++ c:w o:/exile target.*creature/ (t:instant or t:sorcery) not:funny',
        length: 10
    },
    {
        description: "rares from Ravnica",
        query: "r:rare s:rav is:booster",
        length: 10
    },


    // Block questions (reverse chronological order)
    {
        description: "instant-speed cards from M19 limited?",
        query: 's:m19 (t:instant or o:flash) is:booster',
        length: 10
    },

    {
        description: "legendary creatures from Dominaria",
        query: '++ s:dom t:legendary t:creature',
        length: 10
    },

    {
        description: "dinosaurs from Ixalan block",
        query: 'b:xln t:dinosaur',
        length: 10
    },

    {
        description: "gods from Amonkhet block",
        query: "r:rare s:rav is:booster",
        length: 10
    },

    {
        description: "Kaladesh-block energy cards",
        query: '++ o:{E}',
        length: 10
    },

    {
        description: "transform cards from Shadows over Innistrad",
        query: '++ b:soi is:transform',
        length: 10
    },

    {
        description: "cards with Devoid",
        query: '++ o:devoid b:bfz',
        length: 10
    },

    {
        description: "rares from Origins",
        query: '++ r:rare s:ori',
        length: 10
    },

    {
        description: "multicolored cards from Khans",
        query: '++ c:m b:ktk',
        length: 10
    },

    {
        description: "Theros commons",
        query: "++ r:common s:THS",
        length: 10
    },

    {
        description: "Maze Runners from Dragon's Maze",
        query: "++ s:dgm t:legendary t:creature",
        length: 10
    },

    {
        description: "Landfall cards",
        query: '++ o:landfall',
        length: 10
    },


    // Misc questions
    {
        description: "all prints of the Shocklands",
        query: "++is:shockland",
        length: 10
    },

    {
        description: "modern legal cards worth more than $50 USD",
        query: "f:modern usd>50",
        length: 10
    },

    {
        description: "multicolour legendary creatures (commanders)",
        query: "c:m t:creature t:legendary not:funny",
        length: 10
    },

    {
        description: "merfolk from all parts of Magic",
        query: "++ t:creature t:merfolk not:funny",
        length: 10
    },

    {
        description: "Buy-a-Box promos",
        query: "++ is:buyabox",
        length: 10
    },

    {
        description: "Textless player rewards promos",
        query: "++ st:player_rewards",
        length: 10
    },

    {
        description: "All rare lands in Magic",
        query: "++r:rare t:land not:funny",
        length: 10
    },

    {
        description: "All planeswalkers in Magic",
        query: "++ t:planeswalker not:funny",
        length: 10
    },
];

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
                        {presetQuizzes.map(quiz => {
                            return <ListItem button onClick={() => store.startQuiz({
                                query: quiz.query,
                                prompt: 'image',
                                quizLength: quiz.length
                            })}>
                                <ListItemIcon>
                                    <PlayArrow/>
                                </ListItemIcon>
                                <Typography variant={'body1'}>
                                    {quiz.description}
                                </Typography>
                            </ListItem>
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}
