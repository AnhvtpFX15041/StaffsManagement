import React from 'react';
import { Card, CardImg, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import {  } from 'react-router-dom';

    function RenderStaff({staff, departments, deleteStaff}) {
        //const history = useHistory();
        const onDeleteStaff = () => {
            deleteStaff(staff.id);
            history.push("/staffs");
        };
        const department = departments.departments.filter((department) => { return department.id.indexOf(staff.departmentId)!==-1})[0];
        return(
            <div className = "container">
            <div className = "row">
                <div  className="col-12 col-lg-3 col-md-4 m-1">
                <Card>
                    <CardImg width="100%" top src={staff.image} alt={staff.name} />
                </Card>
                </div>
                <div className="col-12 col-lg-8 col-md-7 m-1">
                        <h3>Họ và tên: {staff.name}</h3>
                        <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                        <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                        <p>Phòng ban: {department.name}</p>
                        <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                        <p>Số ngày đã làm thêm: {staff.overTime}</p>
                </div>
            </div>
            <div className="row">
                <Button onClick={onDeleteStaff}>Xóa nhân viên</Button>
                <Button>Thay đổi thông tin</Button>
            </div>
            </div>  
        )
    }
    const StaffDetail = (props) => {
        
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        if (props.staff != null)
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <hr />                
                    </div>
                    <RenderStaff staff={props.staff} departments={props.departments} deleteStaff={props.deleteStaff}/>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default StaffDetail;