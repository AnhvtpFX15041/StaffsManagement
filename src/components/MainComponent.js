import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import FindStaff from './StaffFindComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Button } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
          };
        const ListSelect = () => {
          return (
            <div className="container">
                <FindStaff staffs={this.state.staffs}/>
                <div className="row">
                    <List staffs={this.state.staffs}/>
                </div>
            </div>
          )
        };
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component= {ListSelect}/>
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route exact path="/department" component={() => <DeptList departments={this.state.departments}/>}/>
                    <Route exact path="/salary" component={() => <SalaryList staffs={this.state.staffs}/>}/>
                    <Redirect to="/staffs" />
                </Switch>
                <Footer/>
            </div>
        );
  
    }
}

export default Main;