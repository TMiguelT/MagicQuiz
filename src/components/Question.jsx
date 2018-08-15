import React from 'react';
import {observer} from 'mobx-react';

import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import quizStore from '../stores/QuizStore';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    manaIcon: {
        '& img': {
            width: '1em',
            height: '1em',
            top: '0.15em',
            position: 'relative'
        }
    }
});

@observer
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.answerRef = React.createRef();
        this.state = {
            imageLoading: true,
            answer: ''
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the card changed, show the spinner
        if (prevProps.card.mtgo_id !== this.props.card.mtgo_id)
            this.setState({imageLoading: true});

        if ('scollIntoView' in this.container.current)
            this.container.current.scrollIntoView();
    }

    imageLoaded() {
        this.setState({imageLoading: false});
        this.answerRef.current.focus();
    }

    render() {
        const {card, clues, classes} = this.props;

        let art;
        if ('card_faces' in this.props.card) {
            art = card.card_faces[0].image_uris.art_crop;
        }
        else
            art = card.image_uris.art_crop;

        const progress = this.state.imageLoading ? <Grid container justify={'center'}><CircularProgress/></Grid> : null;

        return (
            <Card ref={this.container}>
                <CardHeader title="What is this card?"/>
                <CardContent>
                    {clues.includes('mana') && <p>
                        <Typography variant={'body1'} className={classes.manaIcon}>
                            <strong>Mana Cost:</strong> {card.fieldAsComponent('mana_cost')}
                        </Typography>
                    </p>}
                    {clues.includes('type') && <p>
                        <Typography variant={'body1'}>
                            <strong>Type:</strong> {card.frontField('type_line')}
                        </Typography>
                    </p>}
                    {clues.includes('flavour') && card.frontField('flavor_text') && <p>
                        <Typography variant={'body1'}>
                            <strong>Flavour Text:</strong> {card.frontField('flavor_text')}
                        </Typography>
                    </p>}
                    {clues.includes('text') && card.frontField('oracle_text') && <p>
                        <Typography variant={'body1'} className={classes.manaIcon}>
                            <strong>Oracle Text:</strong> {card.fieldAsComponent('oracle_text')}
                        </Typography>
                    </p>}
                    {clues.includes('image') && <div>
                        {progress}
                        <img
                            style={{
                                height: '100%',
                                width: '100%',
                                display: this.state.imageLoading ? 'none' : 'unset'
                            }}
                            onLoad={this.imageLoaded.bind(this)}
                            src={art}
                        />
                    </div>}
                    <form onSubmit={this.submit.bind(this)}>
                        <Grid spacing={16} container justify={'center'} alignItems={'center'}>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Answer</InputLabel>
                                    <Input value={this.state.answer} onChange={this.answerChanged.bind(this)}
                                           inputRef={this.answerRef}/>
                                </FormControl>
                                <Button onClick={this.submit.bind(this)} variant="contained"
                                        color="primary">Submit</Button>
                            </div>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );

    }

    answerChanged(event) {
        this.setState({answer: event.target.value});
    }

    submit(event) {
        this.setState({answer: ''});
        quizStore.giveAnswer(this.state.answer);

        event.preventDefault();
    }
}

export default withStyles(styles)(Question);
