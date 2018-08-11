import React from 'react';
import {observer} from 'mobx-react';

import NewQuiz from '../forms/NewQuiz';

const form = new NewQuiz();

import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

@observer
class Form extends React.Component {

    render() {
        return (
            <form onSubmit={form.onSubmit}>
                <input hidden type="submit"/>
                <Card>
                    <CardHeader title="Create your quiz"/>
                    <CardContent>
                        <Grid container justify={'flexStart'}>
                            <TextField
                                className={this.props.classes.textField}
                                {...form.$('query').bind()}
                                label={form.$('query').label}
                                margin={'normal'}
                                helperText={form.$('query').error}
                            />

                            {/*(using <a href="https://scryfall.com/docs/reference">Scryfall syntax</a>)*/}
                            {/*<p>{}</p>*/}

                            <TextField
                                className={this.props.classes.textField}
                                {...form.$('quizLength').bind()}
                                type='number'
                                label={form.$('quizLength').label}
                                margin={'normal'}
                                helperText={form.$('quizLength').error}
                            />
                            <p>{form.error}</p>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} variant={'contained'} color="primary" onClick={form.onSubmit}>
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withStyles(styles)(Form);
