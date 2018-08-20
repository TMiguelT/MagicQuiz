import React from "react";
import {observer} from "mobx-react";

import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import FormHelperText from "@material-ui/core/FormHelperText";

import {withStyles} from "@material-ui/core/styles";

import red from "@material-ui/core/colors/red";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

@observer
class Form extends React.Component {
    constructor(){
        super();
        this.state = {
            showSnackbar: false
        };
    }
    
    closeSnackbar(){
        this.setState({
            showSnackbar: false
        })
    }
    
    submitForm(e){
        const {form} = this.props;
        
        form.submit({
            onError: (fieldset) => {
                this.setState({
                    showSnackbar: true
                })
            },
        });
        
        e.preventDefault();
    }

    render() {
        const {form} = this.props;
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                
                {/*Popup for when the user submits an invalid form*/}
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
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
                <Card>
                    <CardHeader title="Create your quiz"/>
                    <CardContent>
                        <Grid container direction={"column"} justify={"flex-start"}>
                            <TextField
                                fullWidth={true}
                                className={this.props.classes.textField}
                                {...form.$("query").bind()}
                                label={form.$("query").label}
                                margin={"normal"}
                                error={form.$("query").error || null}
                                helperText={form.$("query").error || <div>Using <a href="https://scryfall.com/docs/reference">Scryfall syntax</a></div>}
                            />

                            <TextField
                                fullWidth={true}
                                className={this.props.classes.textField}
                                {...form.$("quizLength").bind()}
                                type='number'
                                label={form.$("quizLength").label}
                                margin={"normal"}
                                error={form.$("quizLength").error || null}
                                helperText={form.$("quizLength").error || 'Number of questions in the quiz'}
                            />

                            <FormControl
                                className={this.props.classes.textField}
                                margin={"normal"}
                                fullWidth={true}
                            >
                                <InputLabel>{form.$("clues").label}</InputLabel>
                                <Select
                                    multiple
                                    error={form.$("clues").error || null}
                                    renderValue={selected =>
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value}/>
                                            ))}
                                        </div>
                                    }
                                    input={<Input id="select-multiple-checkbox"/>}

                                    {...form.$("clues").bind()}
                                >
                                    {form.$("clues").extra.map(option =>
                                        <MenuItem key={option.value} value={option.value}>
                                            <Checkbox checked={form.$("clues").values().indexOf(option.value) > -1}/>
                                            <ListItemText primary={option.label}/>
                                        </MenuItem>
                                    )}
                                </Select>
                                <FormHelperText>{form.$("clues").error || 'Parts of each card you are shown'}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} variant={"contained"} color="primary" onClick={this.submitForm.bind(this)}>
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withStyles(styles)(Form);
