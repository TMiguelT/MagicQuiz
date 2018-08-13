import React from "react";
import {observer} from "mobx-react";

import NewQuiz from "../forms/NewQuiz";

const form = new NewQuiz();

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
import {Creatable} from "react-select";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
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
                        <Grid container direction={"column"} justify={"flexStart"}>
                            <TextField
                                fullWidth={true}
                                className={this.props.classes.textField}
                                {...form.$("query").bind()}
                                label={form.$("query").label}
                                margin={"normal"}
                                helperText={form.$("query").error}
                            />

                            <TextField
                                fullWidth={true}
                                className={this.props.classes.textField}
                                {...form.$("quizLength").bind()}
                                type='number'
                                label={form.$("quizLength").label}
                                margin={"normal"}
                                helperText={form.$("quizLength").error}
                            />

                            <FormControl
                                className={this.props.classes.textField}
                                margin={"normal"}
                                fullWidth={true}
                            >
                                <InputLabel>{form.$("clues").label}</InputLabel>
                                <Select
                                    multiple
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
                                <FormHelperText>{form.$("clues").error}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} variant={"contained"} color="primary" onClick={form.onSubmit}>
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withStyles(styles)(Form);
