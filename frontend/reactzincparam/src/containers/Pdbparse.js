import React, {Component} from 'react';
import Readfile from '../components/Readfile'
import checkpdb from "../utils/checkpdb";
import { connect } from 'react-redux';
import * as actionTypes from  '../components/store/action'

class Pdbparse extends Component {
    render() {
        // if (this.state.pdbmon){
        //     checkpdb(this.state.pdbmon);
        // }
        return(

            <div>
                <h1> Zn parameter force field </h1>
                <Readfile addfile={(txt) => this.props.onAddPdb(txt) }>Amber pdb</Readfile>
                <ul>
                    {this.props.pdb.map(strResult => (
                        <li key={Math.random()} >{strResult}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       pdb: state.pdb
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPdb: (result) => dispatch({type: actionTypes.ADD_PDB, result: result}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Pdbparse);