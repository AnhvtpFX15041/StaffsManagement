import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, FormGroup, Label, Input, Col, 
    ModalHeader, Modal, ModalBody, ModalFooter} from 'reactstrap';
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
    function List (props) { 
        const [staffs, setStaffs] = useState(props.staffs);
        const searchText = useRef(null);
        const [isOpen, setIsOpen] = useState(false);
        const showModal = () => {
            setIsOpen(true);
          };
        
          const hideModal = () => {
            setIsOpen(false);
          };
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
                                <Button onClick={showModal} style = {{margin: 3, justifyContent: 'right'}}><i className="fa fa-plus"></i></Button>
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
                <Modal isOpen={isOpen} onHide={hideModal}>
                    <ModalHeader>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label htmlFor="name" lg={4} md={4} sm={12}>Tên</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input lg={4} md={6} sm={12} type="text" id="name" name="name"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="birth" lg={4} md={4} sm={12}>Ngày sinh</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="date" id="birth" name="birth"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="enter" lg={4} md={4} sm={12}>Ngày vào công ty</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="date" id="enter" name="enter"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="dept" lg={4} md={4} sm={12}>Phòng ban</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="select">
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="scale" lg={4} md={4} sm={12}>Hệ số lương</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="scale" placeholder="1.0 -> 3.0" name="scale"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="leave" lg={4} md={4} sm={12}>Số ngày nghỉ còn lại</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="leave" placeholder="1.0" name="leave"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overtime" lg={4} md={4} sm={12}>Số ngày đã làm thêm</Label>
                                <Col lg={4} md={6} sm={12}>
                                    <Input type="text" id="overtime" placeholder="1.0" name="overtime"></Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button>Thêm</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
export default List;