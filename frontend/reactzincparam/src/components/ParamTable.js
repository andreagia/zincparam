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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
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
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const ParamTabale = (props) => {
    const classes = useStyles();
    const click = () => {
        console.log("Cliccked");
    };
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Action</TableCell>
                        <TableCell align="right">Resid</TableCell>
                        <TableCell align="right">Name</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                        <TableCell>
                            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                <AddIcon onClick={() => props.selectlig("zn")}/>
                            </Fab>
                            <Fab disabled={!/[0-9]+/.test(props.ligzn)} aria-label="delete" className={classes.fab}>
                                <DeleteIcon onClick={()=> props.delselectlig("zn")}/>
                            </Fab>
                        </TableCell>
                        <TableCell>
                            {props.ligzn}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                <AddIcon onClick={() => props.selectlig("1")}/>
                            </Fab>
                            <Fab disabled={!/[0-9]+/.test(props.lig1)} aria-label="delete" className={classes.fab}>
                                <DeleteIcon onClick={()=> props.delselectlig("1")}/>
                            </Fab>
                        </TableCell>
                        <TableCell>
                            {props.lig1}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                <AddIcon onClick={() => props.selectlig("2")}/>
                            </Fab>
                            <Fab disabled={!/[0-9]+/.test(props.lig2)} aria-label="delete" className={classes.fab}>
                                <DeleteIcon onClick={()=> props.delselectlig("2")}/>
                            </Fab>
                        </TableCell>
                        <TableCell>
                            {props.lig2}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                <AddIcon onClick={() => props.selectlig("3")}/>
                            </Fab>
                            <Fab disabled={!/[0-9]+/.test(props.lig3)} aria-label="delete" className={classes.fab}>
                                <DeleteIcon onClick={()=> props.delselectlig("3")}/>
                            </Fab>
                        </TableCell>
                        <TableCell>
                            {props.lig3}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                <AddIcon onClick={() => props.selectlig("4")}/>
                            </Fab>
                            <Fab disabled={!/[0-9]+/.test(props.lig4)} aria-label="delete" className={classes.fab}>
                                <DeleteIcon onClick={()=> props.delselectlig("4")}/>
                            </Fab>
                        </TableCell>
                        <TableCell>
                            {props.lig4}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>

    )
};

export default ParamTabale;