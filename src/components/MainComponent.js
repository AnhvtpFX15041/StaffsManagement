import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}
class Main extends Component {
  constructor(props) {
    super(props);
  }
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
          };
        const addStaff = (newstaff) => {
          let dept = this.props.departments.filter((dept) =>{return dept.id === newstaff.target.department.value})[0];
          let newstaffs = {
            id: this.props.staffs.length,
            name: newstaff.target.staffname.value,
            doB: newstaff.target.doB.value,
            salaryScale: newstaff.target.salaryScale.value,
            startDate: newstaff.target.startDate.value,
            department: dept,
            annualLeave: newstaff.target.annualLeave.value,
            overTime: newstaff.target.overTime.value,
            image: '/assets/images/alberto.png',
          };
          let key = this.props.departments.indexOf(dept);
          let depart = this.props.departments[key];
          let staffobject = JSON.stringify(newstaffs);
          localStorage.setItem(`${newstaffs.name}`, staffobject);
          this.setState({
            staffs: [...this.props.staffs, JSON.parse(localStorage.getItem(`${newstaffs.name}`))],
            departments: [...this.props.departments, depart.numberOfStaff+=1] 
          })
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {() => <List staffs={this.props.staffs} addStaff={addStaff}/>}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.props.departments}/>}/>
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.props.staffs}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default withRouter(connect(mapStateToProps)(Main));