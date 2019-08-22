import * as actionType from "./action"
const initialState = {
    pdb:[]
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
    }
    return state;
};

export default reducer;