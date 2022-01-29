import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat, { masks } from 'dateformat';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null
        };
    }
    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff});
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
                <div className="col-12 col-md-6 m-0">
                    <Card key={staff.id}
                        onClick={()=> this.onStaffSelect(staff)}>
                        <CardText width="100%">{staff.name}</CardText>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {list}
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 m-0">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;