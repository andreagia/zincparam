import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Spinner from '../spinner/Spinner'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'scroll'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.setClose();
    };

    let error = null;
    console.log(props.error);
    if (props.error) {

        error = (
            <div>
            <ul>
                {props.error.map(a =>
                    (<li key={Math.random()}>{a}</li>)
                )}
            </ul>
                <button type="Button" onClick={handleClose}>Close</button>
        </div>
        )
    }
    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Spinner/>
                        {error}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}