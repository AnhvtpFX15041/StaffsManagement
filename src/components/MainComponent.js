import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDepartments, fetchSalaries } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries
  }
}
const mapDispatchToProps = dispatch => ({
  postStaff: (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(postStaff(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
  fetchStaffs: () => { dispatch(fetchStaffs())},
  //resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchSalaries: () => dispatch(fetchSalaries())
});

class Main extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };*/
  }
  
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
          };
        const DeptWithId = ({match}) => {
          return(
              <List staffs={this.props.departments.departments.filter((department) => department.id === parseInt(match.params.departmentId,10))[0]} />
          );
        };
        /*const postStaff = (newstaff) => {
          const dept = this.state.departments.filter((dept) =>{return dept.id === newstaff.department})[0];
          const newstaffs = {
            id: this.state.staffs.length,
            name: newstaff.staffname,
            doB: newstaff.doB,
            salaryScale: newstaff.salaryScale,
            startDate: newstaff.startDate,
            department: dept,
            annualLeave: newstaff.annualLeave,
            overTime: newstaff.overTime,
            image: '/assets/images/alberto.png',
          };
          const key = this.state.departments.indexOf(dept);
          const departments = this.state.departments.slice();
          departments[key].numberOfStaff += 1;
          const staffobject = JSON.stringify(newstaffs);
          localStorage.setItem(`${newstaffs.name}`, staffobject);
          this.setState({
            staffs: [...this.state.staffs, JSON.parse(localStorage.getItem(`${newstaffs.name}`))],
            departments: departments 
          })
        }*/
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {() => <List staffs={this.props.staffs} addStaff={postStaff}/>}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.props.departments}/>}/>
                    <Route path='/departments/:departmentId' component={DeptWithId} />
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.props.staffs}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));