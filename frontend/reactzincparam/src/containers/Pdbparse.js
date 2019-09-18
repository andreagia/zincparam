import React, {Component} from 'react';
import Readfile from '../components/Readfile'
import Nglview from '../components/Nglview';
import { connect } from 'react-redux';
import * as actionTypes from  '../components/store/action'
import axios from "axios";

class Pdbparse extends Component {
    state = {
        checked: false
    };


    checkpdb = (pdb) => {

        let filter1 = pdb.filter(a => a.match(/^ATOM/) || a.match(/^END/));
        console.log(filter1);
        let prev = null;
        let chain = pdb.filter(a => a.match(/^ATOM/)).reduce((m, a) => {
            //console.log(a);
            let rnu = a.slice(22, 26).trim();
            let rna = a.slice(17, 20).trim();
            //console.log(a, rnu, rna, m);
            if (rnu !== prev) {
                m.set(rnu,rna);
            }
            prev = rnu;
            return m;
        }, new Map());


        let downloadPDB = {
            filepdb: [...filter1]

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        console.log("----------- POSTDATA --------");
        console.log(downloadPDB.filepdb);
        axios.post('http://localhost:8080/restzn/sendpdb', downloadPDB, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            });

        return  {
            pdb: [...filter1],
            chain: chain
        };

    };


    render() {
        return(
            <div>
                <h1> Zn parameter force field </h1>
                <Readfile addfile={(txt) => this.props.onAddPdb(txt) }>Amber pdb</Readfile>
                <Nglview key={Math.random().toString(36).substr(2)} pdbfile={this.props.pdb} />

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
       pdb: state.pdb
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPdb: (result) => dispatch({type: actionTypes.ADD_PDB, result: result}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Pdbparse);