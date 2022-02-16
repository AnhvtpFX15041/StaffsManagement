import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, FormGroup, FormFeedback, Label, Input, Col, 
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
            staffname: '',
            doB: '',
            startDate: ''
        });
        const [touch, setTouch] = useState({
            staffname: false,
            doB: false,
            startDate: false
        });
        const handleBlur = (field) => (evt) => {
            setTouch({...touch, [field]: true})
        };
        const handleInputChange = (event) =>{
            const target = event.target;
            const value = target.value;
            const name = target.name;
            setState({
                ...state,[name]: value
            })
        }
        const validate = (staffname, doB, startDate) => {
            const errors = {
                staffname: '',
                doB: '',
                startDate: ''
            };
            const regexdate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/
            if (touch.staffname && staffname === ''){
                errors.staffname='Yêu cầu nhập'
            } else if (touch.staffname && staffname.length < 2){
                errors.staffname='Yêu cầu nhiều hơn 2 ký tự'
            } else if (touch.staffname && staffname.length > 29){
                errors.staffname='Yêu cầu ít hơn 30 ký tự'
            };
            
            if (touch.doB && !regexdate.test(doB)){
                errors.doB='Yêu cầu nhập'
            };
            if (touch.doB && !regexdate.test(startDate)){
                errors.startDate='Yêu cầu nhập'
            };
            return errors;
        }
        const handleSubmit = (values) => {
            props.addStaff(values);
            values.preventDefault();
        };
        const toggleModal =() =>{
                setIsOpen(!isOpen)
        };
        const errors = validate(state.staffname, state.doB, state.startDate);
        return(
            <div>
                <Button onClick={toggleModal} style = {{marginTop: 3, marginLeft: 0}}><i className="fa fa-plus"></i></Button>
                <Modal isOpen={isOpen}>
                    <ModalHeader toggle={toggleModal}>
                        <h5>Thêm nhân viên</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => {handleSubmit(values)}}>
                            <FormGroup row>
                                <Label htmlFor="staffname" lg={4} md={4} sm={12}>Tên</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input  
                                        type="text" id="staffname" name="staffname" required
                                        value = {state.staffname}
                                        onBlur = {handleBlur('staffname')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.staffname===''}
                                        invalid = {errors.staffname!==''} />
                                    <FormFeedback>{errors.staffname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" lg={4} md={4} sm={12}>Ngày sinh</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="date" id="doB" name="doB" required
                                        value = {state.doB}
                                        onBlur = {handleBlur('doB')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.doB===''}
                                        invalid = {errors.doB!==''}
                                     />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" lg={4} md={4} sm={12}>Ngày vào công ty</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="date" id="startDate" name="startDate" required
                                        value = {state.startDate}
                                        onBlur = {handleBlur('startDate')}
                                        onChange = {handleInputChange} 
                                        valid = {errors.startDate===''}
                                        invalid = {errors.startDate!==''}/>
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="dept" lg={4} md={4} sm={12}>Phòng ban</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="select" name="department">
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
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="scale" placeholder="1.0 -> 3.0" 
                                    defaultValue = "1" name="salaryScale" min="1" max="3"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="leave" lg={4} md={4} sm={12}>Số ngày nghỉ còn lại</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="leave" placeholder="1.0" defaultValue = "0" name="annualLeave"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overtime" lg={4} md={4} sm={12}>Số ngày đã làm thêm</Label>
                                <Col lg={8} md={8} sm={12}>
                                    <Input type="text" id="overtime" placeholder="1.0" defaultValue = "0" name="overTime"></Input>
                                </Col>
                            </FormGroup>
                            <Input className="btn-primary" type="submit" value="Thêm"/>
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
                <div key={staff.id} className="col-12 col-md-4 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div style={{display: 'flex'}} className="col-12 col-md-6 col-lg-6 m-0">
                               
                                <h3 className="col-10 col-md-6 col-lg-6" style={{marginTop: 2}}>Nhân viên</h3> 
                                <AddStaff className="col-2 col-md-6 col-lg-6" addStaff={props.addStaff}/>
                                
                            </div>
                            <Form onSubmit = {search} className="col-12 col-md-6 col-lg-6 m-0" style={{display: 'flex', justifyContent: 'right'}}>
                                <Input className="col-10 col-md-6 col-lg-6" style = {{margin: 3}} type="text" placeholder="Nguyễn Văn A" innerRef={searchText}/>
                                <Button className="col-2" style ={{backgroundColor: '#0d6efd', color: 'white', margin: 3, width: 10}} >Tìm</Button>
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