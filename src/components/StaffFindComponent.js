import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class FindStaff extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: null,
            staffs: props.staffs,
            staff: ""
        };
        this.onFindSelect = this.onFindSelect.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event){
        this.setState({ searchText: event.target.value});
        event.preventDefault();
    }
    onFindSelect(){
        this.setState({staff: this.props.staffs.filter((staff) => {
            return staff.name.includes(this.state.searchText)
        })
    });
    }
    render(){
        return(
        <div className="row">
            <div className="col-12">
                <div className="col-6">
                    <h3>Nhân viên</h3> 
                </div>
                <div className="col-6">
                    <input type="text" onChange={this.onInputChange}/>
                    <Button onClick={this.onFindSelect()} component={Link} to = {`/staffs/${this.state.staff.id}`}>Tìm nhân viên</Button>
                </div>   
                <hr />
            </div>                
        </div>
        )
    };
}

export default FindStaff;