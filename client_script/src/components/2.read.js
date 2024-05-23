import axios from "axios";
import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import  Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Button, Form, TabContainer, Table } from "react-bootstrap";
import update from "../images/Update.jpg"
import deleteIcon from "../images/delete.jpg"
import '../App.css'
import '../mobile.css'



function View(){
const [datas,setDatas] = useState([])
const [search,setSearch] = useState('')
useEffect(()=>{
    axios.get("https://backend-2-43qa.onrender.com/view")
        .then((res)=>{
            console.log(res.data)
            setDatas(res.data)
        })

},[])

    return(
        <>
        <TabContainer className="full">
            <Col className="d-flex main">
                <div className="position-fixed d-flex p-3 pt-5 d-xs-none left_aside">
                    <div className="d-flex">
                        <div className="avtar"></div>
                            <div>
                                <h3 className="text-white"><b>Yellow Owl</b></h3>
                                <h6 className="text-white transparent p-1">Admin</h6>
                            </div>
                    </div>
                </div>
        
                <Row className="">
                    <Col className="heading_line">
                        <h3 className="text-white p-4 total_heading">Student</h3>
                    </Col>
                    <Container className="container">
                        <Row className="">
                            <Col className="total_heading mt-5">
                                <b className="bold">Student</b>
                            </Col>
                            <Col md="auto" className="mt-5">
                                <Form.Control 
                                    type="text" 
                                    id="search" 
                                    placeholder="search..." 
                                    onChange={
                                        (e)=>
                                            {
                                                setSearch(e.target.value)
                                            }}/>
                            </Col>
                            <Col className="mt-5 mb-2">
                                <Link to="/post">
                                    <Button className="col-6 border-white text-wrap green"
                                    style={{
                                        background: "#22C55E", borderRadius:"4px"
                                        }}>
                                        <b>ADD NEW STUDENT</b></Button></Link></Col>
                        </Row>
                    </Container>
                    <Col className="table_div total_heading">
                        <Table responsive>
                            <thead className="text-start header rounded-5" style={{background: "#F9FAFB"}}>
                                <th></th>
                                <th className="px-2 p-2">NAME</th>
                                <th className="px-2 p-2">EMAIL</th>
                                <th className="px-2 p-2">PHONE</th>
                                <th className="px-2 p-2">ENROLL NUMBER</th>
                                <th className="px-2 p-2">DATE OF ADMISSION</th>
                                <th></th>
                                <th></th>
                            </thead>
                            <tbody style={{backgroundColor:"white"}}>
                                {
                                    
                                    datas.filter((val)=>{
                                        return search.toLowerCase() === ''
                                        ? val : val.name.toLowerCase().includes(search)
                                        ? val : val.enroll_number.toString().includes(search)
                                        ? val : val.email.toLowerCase().includes(search)
                                                    
                                        
                                    }).map((val,ind)=>{
                                        const d = new Date(val.date_of_admission)
                                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                        return(
                                            <tr key={ind} style={{height:"73px"}}>
                                            <td className="p-1 px-2 text-center"><div className="avtar"></div></td>
                                            <td className="p-2 px-2 text-start"><b>{val.name}</b></td>
                                            <td className="p-2 px-2 text-start">{val.email}</td>
                                            <td className="p-2 px-2 text-start">{val.phone}</td>
                                            <td className="p-2 px-2 text-start">{val.enroll_number}</td>
                                            <td className="p-2 px-2 text-start">{d.getDate()}-{months[d.getMonth()]}, {d.getFullYear()}</td>
                                            <td><Link to={`/edit/${val.enroll_number}`}><img src={update} alt="load.." height={40}/></Link></td>
                                            <td><Link to={`/delete/${val.enroll_number}`}> <img src={deleteIcon} alt="load.." height={40}/></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                
                        </Table>
                    </Col>
                </Row>
            </Col>
        </TabContainer>
        </>
    )
}

export default View
