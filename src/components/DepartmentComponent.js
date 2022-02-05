import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

    function RenderDept({dept}) {
        return(
            <Card>
                <CardBody>
                <CardTitle>{dept.name}</CardTitle>
                <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
                </CardBody>
            </Card>
                
            );
    }
    const DeptList = (props) =>{
        const list = props.departments.map((dept) => {
            return (
                <div className="col-12 col-md-6 col-lg-4 m-0 mt-1">
                    <RenderDept dept = {dept}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
export default DeptList;