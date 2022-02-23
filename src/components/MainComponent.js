import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Deptdetail from './DeptdetailComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDepartments, fetchSalaries,fetchDeptstaff, deleteStaff} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries,
    deptstaff: state.deptstaff
  }
}
const mapDispatchToProps = dispatch => ({
  postStaff: (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(postStaff(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchSalaries: () => dispatch(fetchSalaries()),
  deleteStaff: (id) => dispatch(deleteStaff(id))
  //fetchDeptstaff: (department) => dispatch(fetchDeptstaff(department))
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalaries();
  };
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail departments = {this.props.departments} deleteStaff={deleteStaff} staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}/>
            );
          };
        const DeptWithId = ({match}) => {
          //this.props.fetchDeptstaff(match.params.departmentId);
          return(
              <Deptdetail staffs={this.props.deptstaff}/>
          );
          
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {() => <List staffs={this.props.staffs} postStaff={this.props.postStaff} 
                      />}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.props.departments}/>}/>
                    <Route path='/department/:departmentId' component={DeptWithId} />
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.props.salaries}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));