import React, {Component} from 'react';
import * as NGL from 'ngl';
import checkpdb from "../utils/checkpdb";
import Printchains from "./printchains";

class Nglview extends Component {
    stage = null;
    rep = null;

    shouldComponentUpdate(nextProps, nextState) {
        console.log("NGLVIEW shoulddcomponentupdate 1--------------------------------");
        return this.props.pdbfile !== nextProps.pdbfile
    }

    componentDidMount() {
        console.log("NGLVIEW didmount 1");

        if(!this.stage) {
            this.stage = new NGL.Stage("viewport");
        }

        if (this.props.pdbfile.length > 0) {
            console.log("NGLVIEW didmount 2");
            let dataArray = this.props.pdbfile.filter(item => item.match('^ATOM') && !item.includes("WAT"));
            let retpdb = dataArray.join("\n");
            let blob = new Blob([retpdb], {type: 'text/html'});

            const waitLoadNGL = async (o) => {
                await o.loadFile(blob, {name: "myProtein", ext: "pdb"});
                let dd = o.getComponentsByName("myProtein");
                console.log(dd,o);
                console.log(dd.list[0].structure);
                dd.list[0].addRepresentation("cartoon", {colorScheme: "atomindex"});
                dd.list[0].structure.eachResidue(function (rp) {
                    console.log(rp);
                    console.log(o);
                }, new NGL.Selection("polymer and :A"));
                dd.autoView();
                console.log(dd);
                console.log(dd.structure);
                this.rep = dd.list[0].addRepresentation("ball+stick", {
                    multipleBond: "symmetric",
                    colorValue: "grey",
                    sele: "none",
                    aspectRatio: 1.2,
                    radiusScale: 2.5
                });
                console.log(this.rep);

                return "";
            };
            this.rep = waitLoadNGL(this.stage);
        }

        console.log("--------SATGE--------");
        console.log(this.stage);
    }

    onRowClick = (record, index, event) => {
        console.log(`Click nth(${index}) row of parent, record.name: ${record.rna} ${record.rnu}`);
        // See https://facebook.github.io/react/docs/events.html for original click event details.
        console.log('CLICK STAGE --->', this.stage);
        let first = record.rnu + ".CA";
        this.stage.getComponentsByName("myProtein").addRepresentation("distance", {
            atomPair: [[first, "2.CA"]],
            color: "skyblue"
        });
        if (event.shiftKey) {
            console.log('Shift + mouse click triggered.');
        }
    };

    onRowDoubleClick = (record, index) => {
        console.log(`Double click nth(${index}) row of parent, record.name: ${record.rna} ${record.rnu}`);
    };

    doetest = () => {
        let dd = this.stage.getComponentsByName("myProtein");
        let s = dd.list[0].structure;
        console.log(s);
        dd.list[0].addRepresentation("ball+stick", {
            visible: true,
            // sele: "none",
            aspectRatio: 1.1,
            colorValue: "lightgrey",
            multipleBond: "symmetric"
        });
    };

    pippofun = (pippo) => {
        console.log(pippo);
    };

    showLigand = (sele) => {
        let dd = this.stage.getComponentsByName("myProtein");
        let s = dd.list[0].structure;
        console.log(sele);
        console.log(s);

        let ligandRepr = dd.list[0].addRepresentation("ball+stick", {
            multipleBond: "symmetric",
            colorValue: "grey",
            sele: "none",
            aspectRatio: 1.2,
            radiusScale: 2.5
        });
        console.log(this.rep);
        console.log(ligandRepr);
        this.rep.setVisibility(true);
        this.rep.setSelection(sele);
        //ligandRepr.setVisibility(true);
        //ligandRepr.setSelection(sele);
        dd.list[0].autoView()

    };
    showLigand1 = (sele) => {
        let dd = this.stage.getComponentsByName("myProtein");
        let s = dd.list[0].structure;
        console.log(sele);
        console.log(s);

        let ligandRepr = dd.list[0].addRepresentation("ball+stick", {
          //  visible: true,
            multipleBond: "symmetric",
            colorValue: "grey",
            sele: "none",
            aspectRatio: 1.2,
            radiusScale: 2.5
        });
        //ligandRepr.setVisibility(true);
        console.log(ligandRepr);
        ligandRepr.setSelection(sele);
        dd.list[0].autoView()

    };

    render() {
        let printc = null;
        if (this.props.pdbfile.length > 0) {
            let pdbo = checkpdb(this.props.pdbfile);
            console.log(pdbo.chain);
            printc = <Printchains chain={new Map(pdbo.chain)} sclick={this.onRowClick} dclick={this.onRowDoubleClick}/>
        }

        console.log("NGLVIEW from render");
        console.log(this.state);
        return (
            <div>
                <div id="viewport" style={{width: '400px', height: '400px'}}/>
                <button onClick={this.doetest}
                        className="btn btn-danger">view ball and stick
                </button>
                <button onClick={() => this.showLigand("10:A")}
                        className="btn btn-danger">view ligand
                </button>
                <button onClick={() => this.showLigand("30:A")}
                        className="btn btn-danger">view ligand1
                </button>
                <button onClick={() => this.pippofun("-------PIPPO-------------")}
                        className="btn btn-danger">PIPPO
                </button>
                {printc}
            </div>
        )
    }
}

export default Nglview;