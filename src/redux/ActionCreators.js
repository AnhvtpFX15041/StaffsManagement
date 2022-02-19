import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staff
});
export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {

    const newStaff = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime
    };
    
    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error =>  { console.log('post staffs', error.message); alert('New staff could not be added\nError: '+error.message); });
};