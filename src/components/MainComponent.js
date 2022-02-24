import React, { Component} from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Deptdetail from './DeptdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDepartments, fetchSalaries,
   deleteStaff, updateStaff, addStaffs} from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries,
    deptstaff: state.deptstaff
  }
}
const mapDispatchToProps = dispatch => ({
  addStaffs: (staffs) => dispatch(addStaffs(staffs)),
  postStaff: (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(postStaff(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchSalaries: () => dispatch(fetchSalaries()),
  deleteStaff: (id) => dispatch(deleteStaff(id)),
  updateStaff: (staffid, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(updateStaff(staffid, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime))
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalaries();
  };

    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail departments = {this.props.departments} updateStaff={this.props.updateStaff} deleteStaff={this.props.deleteStaff} 
                  staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                  isLoading={this.props.staffs.isLoading} errMess={this.props.staffs.errMess}/>
            );
          };
        
        const DeptWithId = ({match}) => {
          return(
              <Deptdetail departments={this.props.departments} staffs={this.props.staffs.staffs.filter((staff) =>{ return staff.departmentId === match.params.departmentId})}/>
          );
          
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {() => <List staffs={this.props.staffs} postStaff={this.props.postStaff} isLoading={this.props.staffs.isLoading} errMess={this.props.staffs.errMess} />}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.props.departments}/>}/>
                    <Route path='/department/:departmentId' component={DeptWithId}/>
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.props.salaries}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));