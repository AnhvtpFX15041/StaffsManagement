import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, FormGroup, Label, Input, Col, 
    ModalHeader, Modal, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';


    
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
        const [state, setState] = useState({
            id: props.staffs.length-1,
            staffname: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: '',
            annualLeave: '',
            overTime: '',
            image: '/assets/images/alberto.png'
        });
        const handleInputChange = (e) => {
            const target = e.target;
            const name = target.name
            setState({
                
                [name]: target.value
            });
        }
        const themmoi = (e) => {
            alert(state.id);
        }
        const toggleModal =() =>{
            setIsOpen(!isOpen)
        };
        return(
            <div>
                <Button onClick={toggleModal} style = {{margin: 3, justifyContent: 'right'}}><i className="fa fa-plus"></i></Button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <ModalHeader>
                        <h5>Thêm nhân viên</h5>
                        <button onClick={toggleModal} class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={themmoi}>
                            <FormGroup row>
                                <Label htmlFor="name" lg={4} md={4} sm={12}>Tên</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input lg={4} md={6} sm={12} type="text" id="name" name="staffname" value={state.staffname} onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="birth" lg={4} md={4} sm={12}>Ngày sinh</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="date" id="birth" name="doB" value={state.doB} onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="enter" lg={4} md={4} sm={12}>Ngày vào công ty</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="date" id="enter" value={state.startDate} onChange={handleInputChange} name="startDate"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="dept" lg={4} md={4} sm={12}>Phòng ban</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="select" value={state.department}>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="scale" lg={4} md={4} sm={12}>Hệ số lương</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="scale" placeholder="1.0 -> 3.0" name="salaryScale" value={state.salaryScale} onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="leave" lg={4} md={4} sm={12}>Số ngày nghỉ còn lại</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="leave" placeholder="1.0" name="annualLeave" value={state.annualLeave} onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overtime" lg={4} md={4} sm={12}>Số ngày đã làm thêm</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="overtime" placeholder="1.0" name="overTime" value={state.overTime} onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <Input type="submit" value="Thêm"/>
                        </Form>
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
                <div key={staff.id} className="col-12 col-md-6 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div style={{display: 'flex'}} className="col-12 col-md-4 m-0">
                                <h3 style ={{marginTop: 2}}>Nhân viên</h3> 
                                <AddStaff staffs={props.staffs}/>
                            </div>
                            <Form onSubmit = {search} className="col-12 col-md-8 m-0" style={{display: 'flex', justifyContent: 'right'}}>
                                <Input style = {{margin: 3}}type="text" placeholder="Nguyễn Văn A" innerRef={searchText}/>
                                <Input style ={{backgroundColor: '#0d6efd', width: 'fit-content', color: 'white', margin: 3}} type="submit" value="Tìm"/>
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