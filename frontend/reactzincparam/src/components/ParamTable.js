import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        width: '70%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    tableRow: {
        backgroundColor: "blue !important"
    },
    tableRow1: {
        backgroundColor: "red"
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    fab: {
        margin: theme.spacing(1),
        size: "small"
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    smallButton: {
        margin: theme.spacing(1),
        padding: 1
    },
    pad: {
        padding: "10px"
    }
}));


const ParamTabale = (props) => {
    const classes = useStyles();
    const click = () => {
        console.log("Cliccked");
    };

    let tabcell;
    if (props.listMetal.length > 0 ) {
        tabcell = props.listMetal.map(a =>
            (
                <MenuItem key={Object.keys(a)[0]} value={Object.keys(a)[0]}>{Object.keys(a)[0]}</MenuItem>
            )
        )
    }
    return (
        <div>
            {/*<IconButton className={classes.smallButton} aria-label="Delete">
                <DeleteIcon fontSize="large"/>
            </IconButton>
            <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                <DeleteIcon fontSize="small"/>
            </Fab>*/}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Select</TableCell>

                            <TableCell align="right">Resid</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow  >
                            <TableCell className={classes.pad} >
                                <InputLabel id="demo-mutiple-name-label">Select Metal</InputLabel>
                                <Select value={props.selsetmetal}
                                    onChange={props.setmetal}>
                                    {tabcell}
                                </Select>
                            </TableCell>
                           {/* <TableCell className={classes.pad}>
                                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                                    <AddIcon fontSize="small" onClick={() => props.selectlig("zn")}/>
                                </Fab>
                                <Fab size="small" disabled={!/[0-9]+/.test(props.ligzn)} aria-label="delete"
                                     className={classes.fab}>
                                    <DeleteIcon onClick={() => props.delselectlig("zn")}/>
                                </Fab>
                            </TableCell>*/}
                            <TableCell className={classes.pad}>

                            </TableCell>
                            <TableCell className={classes.pad}>
                                {props.ligzn}
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            {/*<TableCell className={classes.pad}>
                                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                                    <AddIcon onClick={() => props.selectlig("1")}/>
                                </Fab>
                                <Fab size="small" disabled={!/[0-9]+/.test(props.lig1)} aria-label="delete"
                                     className={classes.fab}>
                                    <DeleteIcon onClick={() => props.delselectlig("1")}/>
                                </Fab>
                            </TableCell>*/}
                            <TableCell className={classes.pad}>

                            </TableCell>
                            <TableCell className={classes.pad}>
                                {props.lig1}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                           {/* <TableCell className={classes.pad}>
                                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                                    <AddIcon onClick={() => props.selectlig("2")}/>
                                </Fab>
                                <Fab size="small" disabled={!/[0-9]+/.test(props.lig2)} aria-label="delete"
                                     className={classes.fab}>
                                    <DeleteIcon onClick={() => props.delselectlig("2")}/>
                                </Fab>
                            </TableCell>*/}
                            <TableCell className={classes.pad}>

                            </TableCell>
                            <TableCell className={classes.pad}>
                                {props.lig2}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            {/*<TableCell className={classes.pad}>
                                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                                    <AddIcon onClick={() => props.selectlig("3")}/>
                                </Fab>
                                <Fab size="small" disabled={!/[0-9]+/.test(props.lig3)} aria-label="delete"
                                     className={classes.fab}>
                                    <DeleteIcon onClick={() => props.delselectlig("3")}/>
                                </Fab>
                            </TableCell>*/}
                            <TableCell className={classes.pad}>

                            </TableCell>
                            <TableCell className={classes.pad}>
                                {props.lig3}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {/*<TableCell className={classes.pad}>
                                <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
                                    <AddIcon onClick={() => props.selectlig("4")}/>
                                </Fab>
                                <Fab size="small" disabled={!/[0-9]+/.test(props.lig4)} aria-label="delete"
                                     className={classes.fab}>
                                    <DeleteIcon onClick={() => props.delselectlig("4")}/>
                                </Fab>
                            </TableCell>*/}
                            <TableCell className={classes.pad}>

                            </TableCell>
                            <TableCell className={classes.pad}>
                                {props.lig4}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>

    )
};

export default ParamTabale;