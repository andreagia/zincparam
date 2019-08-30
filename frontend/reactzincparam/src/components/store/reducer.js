import * as actionType from "./action"
const initialState = {
    pdb:[],
    znm: null,
    zn1: null,
    zn2: null,
    zn3: null,
    zn4: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PDB:
            return {
                pdb: [...action.result]
            };

        case actionType.RM_PDB:
            return {
                pdb: []
            };

        default:
            return state;
    }
};

export default reducer;