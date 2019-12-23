import * as math from 'mathjs';

const findNearRes = (pdb, point, distt = 3.0) => {
    let ret = [];
    //remove H and WAT and HOH
    const filter1 = pdb.filter(a => (a.match(/^(ATOM|HETATM)/) && !(a.match(/HOH/) || a.match(/WAT/))) && !a.substring(12, 16).trim().match(/^H/));
    //console.log(filter1);
    let filter2 = filter1.reduce((v, a) => {
        let cor = a.substring(30, 54).split(/\s/).filter(Number).map(Number);
        let rnum = a.substring(23, 26).trim();
        let rname = a.substring(17, 20).trim();
        let aname = a.substring(12, 16).trim();
        //console.log(cor,point[0]);
        let dist = math.distance(cor, point[0]);
        let key = rname + " " + rnum + " " + aname;
        if (distt > dist ) v.push({[key]: dist});
        return v;
        },[]);

    let filter3 = filter2.sort((a, b)=> {
        return Object.values(a)[0] - Object.values(b)[0]
    });

    return filter3;
};
export default findNearRes;
