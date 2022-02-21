import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, Label, Input, Row, Col, 
    ModalHeader, Modal, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
    
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
    
    function Deptdetail (props) { 
        const [staffs, setStaffs] = useState(props.staffs);
        const searchText = useRef(null);
        const search =(e)=>{
            e.preventDefault();
            const searchval = searchText.current.value.toLowerCase();
            setStaffs(props.staffs.staffs.filter((staff) =>{ return staff.name.toLowerCase().indexOf(searchval)!==-1}));
        }
        const list = staffs.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        if (props.staffs.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.staffs.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div style={{display: 'flex', justifyContent: 'left'}} className="col-12 col-md-6 col-lg-6 m-0">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/staffs">Phòng ban</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                            </Breadcrumb>
                                
                            </div>
                            <Form onSubmit = {search} className="col-12 col-md-6 col-lg-6 m-0" style={{display: 'flex', justifyContent: 'left'}}>
                                <Input className="col-9 col-md-8 col-lg-8" style = {{margin: 3, width: 20}} type="text" placeholder="Nguyễn Văn A" innerRef={searchText}/>
                                <Button style ={{backgroundColor: '#0d6efd', color: 'white', margin: 3, marginLeft: 7, width: 58}} >Tìm</Button>
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
export default Deptdetail;