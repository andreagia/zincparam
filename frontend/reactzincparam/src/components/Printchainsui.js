import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    }
}));


const Printchainsui = (props) => {

    const classes = useStyles();

    function createData(name, resid) {
        return {name, resid};
    }

    console.log('Printchains---> ', props.chain);
    let rows = [];
    if (props.chain.size > 0) {

        props.chain.forEach((name, resid) => {
            console.log(name, resid);
            console.log(typeof resid, typeof props.over.toString());
            rows.push(createData(name, resid))
        });
    }
    // console.log('DATA --->',rows);
    console.log("OVER ----> ", props.over);
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>

                        <TableCell align="right">Resid</TableCell>
                        <TableCell align="right">Name</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.resid} onMouseOver={props.tablemouseover.bind(null, row.resid, row.name)}
                                  onClick={props.sclick.bind(null, row.resid, row.name)}
                                  className={(props.over.toString() === row.resid) ? classes.tableRow1 : classes.tableRow}>
                            <TableCell component="th" scope="row">
                                {(props.over.toString() === row.resid) ? row.resid + " OVER " + props.over : row.resid}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>

    )

};

export default Printchainsui;