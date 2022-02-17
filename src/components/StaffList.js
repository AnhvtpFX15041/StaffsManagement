import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, Label, Input, Row, Col, 
    ModalHeader, Modal, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
    
    function RenderStaff({staff}) {
        return(
            <Card>
                <Link to = {`/staffs/${staff.id}`} >
                    <CardImg  width="100%" src= {staff.image} alt = {staff.name} />
                    <CardText className="text-center">{staff.name}</CardText>
                </Link>
            </Card>  
        );
    }
    function AddStaff(props) {
        const [isOpen, setIsOpen] = useState(false);
        
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => !(val) || (val.length >= len);
        const isNumber = (val) => !isNaN(Number(val));
        
        const handleSubmit = (values) => {
            props.addStaff(values);
        };
        const toggleModal =() =>{
            setIsOpen(!isOpen)
        };
        return(
            <div>
                <Button  onClick={toggleModal} style = {{marginTop: 3, marginLeft: 0}}><i className="fa fa-plus"></i></Button>
                <Modal isOpen={isOpen}>
                    <ModalHeader toggle={toggleModal}>
                        <h5>Thêm nhân viên</h5>
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => {handleSubmit(values)}}>
                            <Row className="form-group">
                                <Label htmlFor="staffname" lg={4} md={4} sm={12}>Tên</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Control.text  className="form-control" 
                                        id="staffname" name="staffname" model = ".staffname"
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
                                        name="doB" className="form-control" 
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
                                        name="startDate" className="form-control" 
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
                                <Label htmlFor="department" lg={4} md={4} sm={12}>Phòng ban</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Control.select model=".department" id="department" defaultValue="Dept01" name="department" className="form-control">
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
                                    <Control.text model=".salaryScale" id="scale" placeholder="1.0 -> 3.0" defaultValue="1"
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
                                    <Control.text model=".annualLeave" id="leave" placeholder="1.0" defaultValue="0"
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
                                        defaultValue = "0" name="overTime" className="form-control"
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
                            <Input className="btn-primary col-2 col-md-4 col-lg-4" type="submit" value="Thêm"/>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
    function List (props) { 
        const [staffs, setStaffs] = useState(props.staffs);
        const searchText = useRef(null);
        const search =(e)=>{
            e.preventDefault();
            const searchval = searchText.current.value.toLowerCase();
            setStaffs(props.staffs.filter((staff) =>{ return staff.name.toLowerCase().indexOf(searchval)!==-1}));
        }
        const list = staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div style={{display: 'flex', justifyContent: 'left'}} className="col-12 col-md-6 col-lg-6 m-0">
                                <h3 className="col-10 col-md-6 col-lg-6" style={{margin: 2, padding: 0}}>Nhân viên</h3> 
                                <AddStaff addStaff={props.addStaff}/>
                            </div>
                            <Form onSubmit = {search} className="col-12 col-md-6 col-lg-6 m-0" style={{display: 'flex', justifyContent: 'right'}}>
                                <Input className="col-10 col-md-6 col-lg-6" style = {{margin: 3}} type="text" placeholder="Nguyễn Văn A" innerRef={searchText}/>
                                <Button className="col-2" style ={{backgroundColor: '#0d6efd', color: 'white', margin: 3}} >Tìm</Button>
                            </Form>
                        </div>    
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
export default List;