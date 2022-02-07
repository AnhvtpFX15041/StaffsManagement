import React, { useState } from 'react';
import { Card, CardText, CardImg, Button } from 'reactstrap';
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
        const [searchText, setSearchText] = useState('');
        const handleInputChange=(e)=>{
            setSearchText(e.target.value);
        }
        const search =(e)=>{
            e.preventDefault();
            console.log('Hello');
            setStaffs(props.staffs.filter((staff) =>{ return staff.name == `${searchText}`;}))
        }
        const list = staffs.map((staff) => {
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
                        <div className="col-6">
                          <h3>Nhân viên</h3> 
                        </div>
                        <div className="col-6">
                          <input type="text" placeholder="Nguyễn Văn A" value={searchText} onChange={handleInputChange}/>
                          <Button onClick={search}>Tìm nhân viên</Button>
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