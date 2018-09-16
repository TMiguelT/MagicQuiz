import React from 'react';
import {observer, inject} from 'mobx-react';

import queryString from 'query-string';

import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

import {withStyles} from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';

import PresetsDialogue from './PresetsDialogue';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

@inject('form', 'router')
@observer
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnackbar: false,
            showDialogue: false
        };
    }

    closeSnackbar() {
        this.setState({
            showSnackbar: false
        });
    }

    submitForm(e) {
        const {form, router} = this.props;

        form.submit({
            onError: fieldset => {
                this.setState({
                    showSnackbar: true
                });
            },
            onSuccess: fieldset => {
                this.setState({
                    showSnackbar: false
                });

                router.push({
                    pathname: '/quiz',
                    search: queryString.stringify(fieldset.values())
                });
            }
        });

        e.preventDefault();
    }

    closeDialogue(value) {
        const {form} = this.props;
        this.setState({
            showDialogue: false
        });
        if (value) {
            form.set('value', {
                query: value
            });
        }
    }

    showDialogue() {
        this.setState({
            showDialogue: true
        });
    }

    render() {
        const {form} = this.props;
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <PresetsDialogue onClose={this.closeDialogue.bind(this)} open={this.state.showDialogue}/>

                {/*Popup for when the user submits an invalid form*/}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    open={this.state.showSnackbar}
                    onClose={this.closeSnackbar.bind(this)}
                    autoHideDuration={3000}
                >
                    <SnackbarContent
                        message={'Some of the fields have not been specified properly'}
                        action={[
                            <IconButton
                                onClick={this.closeSnackbar.bind(this)}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                            >
                                <CloseIcon/>
                            </IconButton>
                        ]}

                        style={{
                            backgroundColor: red[600]
                        }}
                    />
                </Snackbar>

                <input hidden type="submit"/>
                <Card style={{
                    maxWidth: '375px'
                }}>
                    <CardHeader title="Create your quiz"/>
                    <CardContent>
                        <Grid container direction={'column'} justify={'flex-start'}>
                            <Grid container direction={'row'} alignItems={'baseline'} justify={'space-between'}
                                  spacing={0}>
                                <TextField
                                    fullWidth={false}
                                    className={this.props.classes.textField}
                                    {...form.$('query').bind()}
                                    label={form.$('query').label}
                                    error={form.$('query').error || null}
                                    helperText={form.$('query').error ||
                                    <span>Using <a
                                        href="https://scryfall.com/docs/reference">Scryfall syntax</a></span>}
                                />
                                <Button size={'small'} variant="contained"
                                        onClick={this.showDialogue.bind(this)}>Presets</Button>
                            </Grid>

                            <TextField
                                fullWidth={true}
                                className={this.props.classes.textField}
                                {...form.$('quizLength').bind()}
                                type='number'
                                label={form.$('quizLength').label}
                                margin={'normal'}
                                error={form.$('quizLength').error || null}
                                helperText={form.$('quizLength').error || 'Number of questions in the quiz'}
                            />

                            <FormControl
                                className={this.props.classes.textField}
                                margin={'normal'}
                                fullWidth={true}
                            >
                                <InputLabel>{form.$('clues').label}</InputLabel>
                                <Select
                                    multiple
                                    error={form.$('clues').error || null}
                                    renderValue={selected =>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }}>
                                            {form.$('clues').extra.map(option => {
                                                    if (selected.includes(option.value))
                                                        return <Chip key={option.value} label={option.label}/>;
                                                    else
                                                        return null;
                                                }
                                            )}
                                        </div>
                                    }
                                    input={<Input id="select-multiple-checkbox"/>}

                                    {...form.$('clues').bind()}
                                >
                                    {form.$('clues').extra.map(option =>
                                        <MenuItem key={option.value} value={option.value}>
                                            <Checkbox checked={form.$('clues').values().indexOf(option.value) > -1}/>
                                            <ListItemText primary={option.label}/>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText>{form.$('clues').error || 'Parts of each card you are shown'}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} variant={'contained'} color="primary"
                                onClick={this.submitForm.bind(this)}>
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withStyles(styles)(Form);
