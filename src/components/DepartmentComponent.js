import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDept({dept}) {
        return(
            <Card>
                <Link to= {`/department/${dept.id}`} >
                    <CardBody>
                    <CardTitle>{dept.name}</CardTitle>
                    <CardText>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
                    </CardBody>
                </Link>
            </Card>
                
            );
    }
    const DeptList = (props) =>{
        const list = props.departments.departments.map((dept) => {
            return (
                <div key={dept.id} className="col-12 col-md-6 col-lg-4 m-0 mt-5">
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