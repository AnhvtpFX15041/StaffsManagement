import React, { Component } from 'react';
import List from './StaffList';
import StaffDetail from './StaffdetailComponent';
import DeptList from './DepartmentComponent';
import SalaryList from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      department: DEPARTMENTS
    };
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    }
    render(){
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
          };
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/staffs" component={() => <List staffs={this.state.staffs}/>}/>
                    <Route path='/menu/:staffId' component={StaffWithId} />
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