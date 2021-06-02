import React, { Component } from "react"
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Link } from "react-router-dom";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";


export default class CreateRoomPage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        })
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        })
    }

    handleRoomButtonPressed() {
        console.log(this.state)
        const requestOptions = {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        }
        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push('/room/' + data.code))
    }

    
    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Create a Room
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset" >
                            <FormHelperText>
                                <div align='center'>
                                    Guest control of playback state
                                </div>
                            </FormHelperText>
                            <RadioGroup row defaultValue='true' onChange={this.handleGuestCanPauseChange} >
                                <FormControlLabel 
                                value="true" 
                                control={<Radio 
                                color='primary' />}
                                label="Play/Pause"
                                labelPlacement="bottom" />

                                <FormControlLabel 
                                value="false" 
                                control={<Radio 
                                color='secondary' />}
                                label="No Control"
                                labelPlacement="bottom" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField 
                            required={true} 
                            type="number" 
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes} 
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }} />
                            <FormHelperText>
                                <div align="center">
                                    Votes Reqired to Skip Song
                                </div>
                            </FormHelperText>
                        </FormControl>
                        <Grid item xs={12} align="center">
                            <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed} >Create a Room</Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button color="secondary" variant="contained" to="/" component={Link} >Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
