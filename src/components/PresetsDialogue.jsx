import React from 'react';
import {observer} from 'mobx-react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import PlayArrow from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';

import shuffle from 'lodash.shuffle';

import presets from '../presets';
const presetSubset = shuffle(presets);

@observer
export default class Presets extends React.Component {

    handleClose(value){
        console.log(value);
        this.props.onClose(value);
    };

    render() {
        const {open} = this.props;
        return (
            <Dialog onClose={() => this.handleClose(null)} open={open}>
                <DialogTitle>Preset quizzes</DialogTitle>
                <List>
                    {presetSubset.map(quiz => {
                        return <ListItem button onClick={() => {
                            this.handleClose(quiz.query);
                        }}>
                            <ListItemIcon>
                                <PlayArrow/>
                            </ListItemIcon>
                            <Typography variant={'body1'}>
                                {quiz.description}
                            </Typography>
                        </ListItem>;
                    })}
                </List>
            </Dialog>
        );
    }
}
