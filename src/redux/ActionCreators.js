import * as ActionTypes from './ActionTypes';

export const addStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime
    }
});