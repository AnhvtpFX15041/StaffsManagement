import React from 'react';
import { Card, CardText, CardImg } from 'reactstrap';
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
    const List = (props) =>{
        const list = props.staffs.map((staff) => {
            return (
                <div className="col-12 col-md-6 col-lg-2 m-0 mt-1">
                    <RenderStaff staff = {staff}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Nhân viên</h3>    
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