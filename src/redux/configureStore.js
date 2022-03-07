import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Staffs} from './staffs';
import {Departments} from './departments';
import { Salaries } from './salaries';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Deptstaff } from './departmentstaff';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            salaries: Salaries,
            deptstaff: Deptstaff

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}


