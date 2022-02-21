import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Staffs} from './staffs';
import {Departments} from './departments';
import { Salaries } from './salaries';
import { Reducer, initialState } from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { AddStaff} from './forms';
import { Deptstaff } from './departmentstaff';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            salaries: Salaries,
            deptstaff: Deptstaff,
            ...createForms({
                addstaff: AddStaff
            })

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}