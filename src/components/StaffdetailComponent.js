import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { Card, CardImg, Button, Label, Input, Row, Col, Breadcrumb, BreadcrumbItem,
    ModalHeader, Modal, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

function UpdatenDel(props) {
    const [isOpen, setIsOpen] = useState(false);
    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => !(val) || (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    
    const onDeleteStaff = () => {
        props.deleteStaff(props.staff.id);
    };
    const handleSubmit = (values) => {
        props.updateStaff(props.staff.id, values.staffname, values.doB, values.startDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime);
        toggleModal();
    };
    const toggleModal =() =>{
        setIsOpen(!isOpen)
    };
    return(
        <div>
            <Button onClick={onDeleteStaff}>Xóa nhân viên</Button>
            <Button onClick={toggleModal}>Thay đổi thông tin</Button>
            <Modal isOpen={isOpen}>
                <ModalHeader toggle={toggleModal}>
                    Thay đổi thông tin
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => {handleSubmit(values)}}>
                        <Row className="form-group">
                            <Label htmlFor="staffname" lg={4} md={4} sm={12}>Tên</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control.text  className="form-control" 
                                    id="staffname" name="staffname" model = ".staffname" defaultValue={props.staff.name}
                                    validators = {{
                                        required, minLength: minLength(3), maxLength: maxLength(29)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".staffname"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                        maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                    }} 
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="doB" lg={4} md={4} sm={12}>Ngày sinh</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control model=".doB" type="date" id="doB" 
                                    name="doB" className="form-control" defaultValue={props.staff.doB.slice(0, 10)}
                                    validators = {{required}}    
                                 />
                                <Errors
                                    className="text-danger"
                                    model=".doB"
                                    show="touched"
                                    messages={{required: 'Yêu cầu nhập'}}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="startDate" lg={4} md={4} sm={12}>Ngày vào công ty</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control model=".startDate" type="date" id="startDate" 
                                    name="startDate" className="form-control" defaultValue={props.staff.startDate.slice(0, 10)}
                                    validators = {{required}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".startDate"
                                    show="touched"
                                    messages={{required: 'Yêu cầu nhập'}}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="departmentId" lg={4} md={4} sm={12}>Phòng ban</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control.select model=".departmentId" id="departmentId" defaultValue={props.staff.departmentId} name="departmentId" className="form-control">
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept03">Marketing</option>
                                    <option value="Dept04">IT</option>
                                    <option value="Dept05">Finance</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="scale" lg={4} md={4} sm={12}>Hệ số lương</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control.text model=".salaryScale" id="scale" placeholder="1.0 -> 3.0" defaultValue={props.staff.salaryScale}
                                    name="salaryScale" className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: 'Yêu cầu nhập số'
                                    }}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="leave" lg={4} md={4} sm={12}>Số ngày nghỉ còn lại</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control.text model=".annualLeave" id="leave" placeholder="1.0" defaultValue={props.staff.annualLeave}
                                    name="annualLeave" className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".annualLeave"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: 'Yêu cầu nhập số'
                                    }}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="overtime" lg={4} md={4} sm={12}>Số ngày đã làm thêm</Label>
                            <Col lg={8} md={8} sm={12}>
                                <Control.text model=".overTime" id="overtime" placeholder="1.0"
                                    defaultValue = {props.staff.overTime} name="overTime" className="form-control"
                                    validators={{
                                        required, isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".overTime"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập',
                                        isNumber: 'Yêu cầu nhập số'
                                    }}
                                 />
                            </Col>
                        </Row>
                        <Input className="btn-primary col-2 col-md-4 col-lg-4" type="submit" value="Cập nhật"/>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    )
}
    function RenderStaff({staff, departments}) {
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
                    <div className="row">
                        <UpdatenDel deleteStaff={props.deleteStaff} updateStaff={props.updateStaff} staff={props.staff}/>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default StaffDetail;