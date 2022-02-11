import React, { useState, useRef } from 'react';
import { Card, CardText, CardImg, Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
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
                            <div className="col-12 col-md-4 m-0">
                                <h3 style ={{marginTop: 2}}>Nhân viên</h3> 
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