import { STAFFS } from '../shared/staffs';
import * as ActionTypes from './ActionTypes';

/*export const Staffs = (state = STAFFS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFF:
            var staff = action.payload;
            staff.id = state.length;
            staff.image = "/asset/images/alberto.png";
            //console.log("Comment: ", comment);
            return state.concat(staff);

        default:
          return state;
      }
};*/
export const Staffs = (state = { isLoading: true,
    errMess: null,
    staffs:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};

        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};