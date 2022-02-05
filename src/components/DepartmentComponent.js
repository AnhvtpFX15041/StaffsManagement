import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

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
                <div className="col-12 col-md-6 col-lg-4 m-0 mt-3">
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