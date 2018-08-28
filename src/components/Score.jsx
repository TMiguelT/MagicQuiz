import React from 'react';
import {observer} from 'mobx-react';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

@observer
export default class Form extends React.Component {

    render() {

        const link = props => <Link to="/" {...props} />;

        return (
            <Card ref={this.container}>
                <CardContent>
                    <Grid container justify={'space-around'} alignContent={'center'}>

                        <Typography variant={'body1'}>
                            Question: {this.props.questionNumber} / {this.props.quizLength}
                        </Typography>
                        <Typography variant={'body1'}>
                            Score: {this.props.points}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify={'space-around'} alignContent={'center'}>
                        <Grid item xs={12}>
                            <Button color={'primary'} fullWidth={true} component={link}>
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        );
    }
}
