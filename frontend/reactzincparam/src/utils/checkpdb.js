import axios from "axios";

const checkpdb = (pdb) => {

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

export default checkpdb;