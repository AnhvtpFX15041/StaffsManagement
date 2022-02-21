import * as ActionTypes from './ActionTypes';
export const Deptstaff = (state = { isLoading: true,
    errMess: null,
    deptstaffs:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPTSTAFF:
            return {...state, isLoading: false, errMess: null, deptstaffs: action.payload};

        case ActionTypes.DEPTSTAFF_LOADING:
            return {...state, isLoading: true, errMess: null, deptstaffs: []}

        case ActionTypes.DEPTSTAFF_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};