const checkpdb = (pdb) => {
// remove all pdb
    //console.log(pdb.content);

    let filter1 = pdb.content.filter(a => a.match(/^ATOM/) || a.match(/^END/));
    console.log(filter1);
    return filter1;

};

export default checkpdb;