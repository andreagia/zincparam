import * as actionType from "./action"
const initialState = {
    checkpdb: false,
    pdbc: [],
    pdb:[],
    znm: null,
    zn1: null,
    zn2: null,
    zn3: null,
    zn4: null,
    ligrepover: "none"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PDB:
            return {
                pdb: [...action.result]
            };
        case actionType.ADD_PDBC:
            return {
                pdbc: [...action.result]
            };
        case actionType.RM_PDB:
            return {
                pdb: []
            };
        case actionType.CHANGE_OVER:
            return {
                ...state,
                ligrepover: action.result
            };
        default:
            return state;
    }
};

export default reducer;