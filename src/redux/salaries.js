import * as ActionTypes from './ActionTypes';
export const Salaries = (state = { isLoading: true,
    errMess: null,
    salaries:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SALARIES:
            return {...state, isLoading: false, errMess: null, salaries: action.payload};

        case ActionTypes.SALARIES_LOADING:
            return {...state, isLoading: true, errMess: null, salaries: []}

        case ActionTypes.SALARIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};

