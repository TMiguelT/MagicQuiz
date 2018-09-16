import React from 'react';
import {observer} from 'mobx-react';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import Cross from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { Link } from 'react-router-dom'

@observer
export default class Form extends React.Component {

    render() {
        let message;
        if (this.props.scorePercent > 50) {
            message = `Well done! You guessed ${Math.round(this.props.scorePercent)}% of questions correctly!`;
        }
        else {
            message = `Bad luck! You only got ${Math.round(this.props.scorePercent)}% of questions correct`;
        }
        const link = props => <Link to="/" {...props} />;

        return (
            <Grid container justify={'center'} direction={'column'} spacing={16}>
                <Grid item>
                    <Card>
                        <CardHeader title="Quiz Completed"/>
                        <CardContent>
                            <Typography variant={'body1'}>
                                {message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth={true} color={'primary'} variant={'contained'} component={link}>
                                Reset
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardHeader title="Your Answers"/>
                        <CardContent>
                            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Your Answer
                                        </TableCell>
                                        <TableCell>
                                            Correct Answer
                                        </TableCell>
                                        <TableCell>
                                            Result
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.answers.map((answer, i) => {
                                        let icon, colour;

                                        if (this.props.correctAnswers[i]) {
                                            icon = <Check/>;
                                            colour = green[600];
                                        }
                                        else {
                                            icon = <Cross/>;
                                            colour = red[600];
                                        }

                                        return <TableRow>
                                            <TableCell>
                                                {answer}
                                            </TableCell>
                                            <TableCell>
                                                <a href={this.props.cards[i].scryfall_uri} target="_blank">
                                                    {this.props.cards[i].frontField('name')}
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <Icon style={{color: colour}}>
                                                    {icon}
                                                </Icon>
                                            </TableCell>
                                        </TableRow>;
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
