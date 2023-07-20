import React, {Component} from 'react';
import Readfile from '../components/Readfile'
import Nglview from '../components/Nglview';
import {connect} from 'react-redux';
import * as actionTypes from '../components/store/action'
import axios from "axios";
import Modal from '../components/UI/modal/Modal'
import {
    Select,
    InputLabel,
    MenuItem,
    CssBaseline,
    AppBar,
    Typography,
    FormControl,
    NativeSelect,
    Box,
    Grid
} from '@mui/material'
//import Select from '@material-ui/core/Select';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';

class Pdbparse extends Component {
    state = {
        checked: false,
        loading: false,
        loadingerror: false,
        format: "Amber"
    };

    checkpdbinput = (pdb) => {

        let filter1 = pdb.filter(a => a.match(/^(ATOM|HETATM)/) || a.match(/^END/));
        //console.log(filter1);

        let downloadPDB = {
            filepdb: [...filter1],
            format: this.state.format

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        this.setState({loading: true});
        console.log("----------- POSTDATA --------");

        console.log(downloadPDB.filepdb);
        let urls ='http://ffmetal.cerm.unifi.it/restzn/sendpdb'
        if (process.env.REACT_APP_DEV === "true") {
            urls = 'http://localhost:8087/restzn/sendpdb';
            console.log(" URLS DEVELOPERS");
        }
        console.log(process.env.REACT_APP_DEV);
        console.log(urls);
        //axios.post('http://ffmetal.cerm.unifi.it/restzn/sendpdb', downloadPDB, axiosConfig)
        axios.post(urls, downloadPDB, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                console.log(res.data.pdbout);
                this.setState({loading: false});
                this.props.onAddPdbc(res.data.filepdb);

            })
            .catch((err, res) => {
                console.log("AXIOS ERROR: ", err.response);
                this.setState({loadingerror: [...err.response.data.infoout]})
            });

        // this.props.onAddPdb(filter1);

    };

    setClose = () => {
        this.setState({loading: false})
    };

    setformat = (event) => {
        console.log("-------SETSTATE-------");
        console.log(event.target.value);
        this.setState({
            format: event.target.value
        })

    };

    render() {

        const pStyle = {
            fontSize: '15px',
            textAlign: 'center',
            color: 'red'
        };

        return (
            <div>
                <CssBaseline/>
                <Grid container spacing={2}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      minHeight="100vh"
                >
                    <AppBar position="relative">
                        <Typography variant="h1"> Zn parameter force field </Typography>
                    </AppBar>
                    <Grid item>
                        <FormControl>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Select
                                program</InputLabel>
                            <NativeSelect
                                allign="center"
                                style={{width: '200px'}}
                                defaultValue={this.state.format}
                                onChange={this.setformat}
                            >
                                <option value={"Amber"}>Amber</option>
                                <option value={"Gromacs"}>Gromacs</option>

                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Readfile addfile={(txt) => this.checkpdbinput(txt)}>File pdb</Readfile>

                        <Modal open={this.state.loading} error={this.state.loadingerror} setClose={this.setClose}/>
                    </Grid>

                    <Nglview key={Math.random().toString(36).substr(2)} pdbfile={this.props.pdbc}/>
                </Grid>

                {/*<ul>*/}
                {/*    {this.props.pdb.map(strResult => (*/}
                {/*        <li key={Math.random()} >{strResult}</li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pdb: state.pdb,
        pdbc: state.pdbc
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPdb: (result) => dispatch({type: actionTypes.ADD_PDB, result: result}),
        onAddPdbc: (result) => dispatch({type: actionTypes.ADD_PDBC, result: result}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Pdbparse);