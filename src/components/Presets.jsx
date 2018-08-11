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

@observer
export default class Form extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title="Choose a preset quiz"/>
                <CardContent>
                    <Typography variant={'body2'}>
                    Can you...
                    </Typography>
                    <List>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'r:rare s:rav',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            <Typography variant={'body1'}>
                            Identify rares from Ravnica?
                            </Typography>
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            <Typography variant={'body1'}>
                                Identify cards banned in legacy?
                            </Typography>
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 's:m19 (t:instant or o:flash) is:booster',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            <Typography variant={'body1'}>
                            Identify the instant-speed cards from M19?
                            </Typography>
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'is:shockland',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            <Typography variant={'body1'}>
                            Identify all Shocklands?
                            </Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}
