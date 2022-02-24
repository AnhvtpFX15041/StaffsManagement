import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs
});
export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING
});
export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments
});
export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING
});
export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess
});
export const addSalaries = (salaries) => ({
  type: ActionTypes.ADD_SALARIES,
  payload: salaries
});
export const salariesLoading = () => ({
  type: ActionTypes.SALARIES_LOADING
});
export const salariesFailed = (errmess) => ({
  type: ActionTypes.SALARIES_FAILED,
  payload: errmess
});
export const addDeptstaff = (staffs) => ({
  type: ActionTypes.ADD_DEPTSTAFF,
  payload: staffs
});
export const deptstaffLoading = () => ({
  type: ActionTypes.DEPTSTAFF_LOADING
});
export const deptstaffFailed = (errmess) => ({
  type: ActionTypes.DEPTSTAFF_FAILED,
  payload: errmess
});
export const fetchDeptstaff = (department) => (dispatch) => {

  return fetch(baseUrl + 'departments/' + department)
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(staffs => {dispatch(addDeptstaff(staffs));
    console.log(staffs)})
  .catch(error => dispatch(deptstaffFailed(`${error.message}`)));
}
export const fetchStaffs = () => (dispatch) => {

  dispatch(staffsLoading(true));

  return fetch(baseUrl + 'staffs')
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(staffs => dispatch(addStaffs(staffs)))
  .catch(error => dispatch(staffsFailed(`${error.message}`)));
}
export const fetchDepartments = () => (dispatch) => {

  dispatch(departmentsLoading(true));

  return fetch(baseUrl + 'departments')
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(departments => dispatch(addDepartments(departments)))
  .catch(error => dispatch(departmentsFailed(`${error.message}`)));
}
export const fetchSalaries = () => (dispatch) => { 
  dispatch(salariesLoading(true));   
  return fetch(baseUrl + 'staffsSalary')
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(salaries => dispatch(addSalaries(salaries)))
  .catch(error => dispatch(salariesFailed(error.message)));
};
export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {

    const newStaff = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/asset/images/alberto.png",
        salary: Math.round((salaryScale)*300000 + (overTime)*200000),

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
    .then(response => dispatch(addStaffs(response)))
    .catch(error =>  { console.log('post staffs', error.message); alert('New staff could not be added\nError: '+error.message); });
};
export const deleteStaff = (id) => (dispatch) => {   
  return fetch(baseUrl + `staffs/${id}`,{
    method: 'DELETE',
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(response => dispatch(addStaffs(response)))
  .catch(error => {alert(error.message)});
};
export const updateStaff = (staffid, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
  return fetch(baseUrl + 'staffs/',{
    method: 'PATCH',
    body: JSON.stringify({
      id: staffid,
      name: name, 
      doB: doB, 
      startDate: startDate, 
      departmentId: departmentId, 
      salaryScale: salaryScale, 
      annualLeave: annualLeave, 
      overTime: overTime}),
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(response => dispatch(addStaffs(response)))
  .catch(error => {alert(error.message)});
};
