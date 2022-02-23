import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Breadcrumb, BreadcrumbItem} from 'reactstrap';
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
        const list = props.staffs.staffs.map((staff) => {
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
                            <div style={{display: 'flex', justifyContent: 'left'}}>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/staffs">Phòng ban</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Marketing</BreadcrumbItem>
                            </Breadcrumb>
                            </div>
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