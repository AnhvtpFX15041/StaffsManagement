import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null,
            selectedColumn: 4
        };
    }
    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff});
    }
    onBtn1Select(){
        this.setState({ selectedColumn: 6});
    }
    onBtn2Select(){
        this.setState({ selectedColumn: 4});
    }
    onBtn3Select(){
        this.setState({ selectedColumn: 3});
    }
    onBtn4Select(){
        this.setState({ selectedColumn: 2});
    }
    renderStaff(staff) {
        if (staff != null)
            return(
                <Card>
                    <CardBody>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
    render() {
        const list = this.props.staffs.map((staff) => {
            return (
                <div className={"col-12 col-md-6 col-lg-" + this.state.selectedColumn +" m-0 mt-1"}>
                    <Card key={staff.id}
                        onClick={()=> this.onStaffSelect(staff)}>
                        <CardText width="100%">{staff.name}</CardText>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <React.Fragment>
                <div className="row">
                    <button onClick={()=> this.onBtn1Select()}>Chế độ xem 2 cột</button>
                    <button onClick={()=> this.onBtn2Select()}>Chế độ xem 3 cột</button>
                    <button onClick={()=> this.onBtn3Select()}>Chế độ xem 4 cột</button>
                    <button onClick={()=> this.onBtn4Select()}>Chế độ xem 6 cột</button>
                </div>
                </React.Fragment>
                <div className="row">
                    {list}
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 m-0 mt-1">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;