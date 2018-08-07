import React from 'react';
import {observer} from 'mobx-react';

// import {Button, Box, Level, Card, Tile} from 'react-bulma-components/full';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrow from '@material-ui/icons/PlayArrow';

import store from '../stores/QuizStore';

@observer
export default class Form extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title="Choose a preset quiz"/>
                <CardContent>
                    Can you...
                    <List>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'r:rare s:rav',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            Identify rares from Ravnica?
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'banned:legacy -o:ante -t:conspiracy -o:/flip ~/',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            Identify cards banned in legacy?
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 's:m19 (t:instant or o:flash) is:booster',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            Identify the instant-speed cards from M19?
                        </ListItem>
                        <ListItem button onClick={() => store.startQuiz({
                            query: 'is:shockland',
                            prompt: 'image',
                            quizLength: 10
                        })}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            Identify all Shocklands?
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}
