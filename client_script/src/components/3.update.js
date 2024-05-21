import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, FloatingLabel, Form, Modal, Stack } from "react-bootstrap";


function Update(){

    const {id} = useParams()
    const [name,setName] = useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone] = useState('')
    const [date_of_admission,setDate_of_admission] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:4009/edit/'+id)
        .then(res=>{
            setName(res.data[0].name)
            setEmail(res.data[0].email)
            setPhone(res.data[0].phone)
            setDate_of_admission(res.data[0].date_of_admission)
        })
        .catch(err=>console.log(err))
    },[])

    const nav = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        axios.put("http://localhost:4009/update/"+id,{name,email,phone,date_of_admission})
        .then(res=>{
            if(res.data.updated){
                alert('updated')
                nav('/')
            }
            else{
                alert("not updated there is some issue")
            }
        })
    }

    return(
        <> 
        <div className="modal show p-5" style={{display:"block",position:"initial"}}>
        <Modal.Dialog className="rounded-3" style={{boxShadow:"1px 1px 5px grey"}}>
            <Modal.Header className="border-white">
                <Modal.Title><b>Edit Student</b></Modal.Title>
            </Modal.Header>
                <Form className="p-3 px-5" onSubmit={handleSubmit}>
                <Form.Group>
                <FloatingLabel label="Name" className="mb-2">
                <Form.Control placeholder="Name" name="name" id="name" value={name} onChange={e=>setName(e.target.value)}/><br/>
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-2">
                <Form.Control placeholder="email" type="text" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
                </FloatingLabel>
                <FloatingLabel label="Phone" className="mb-2">
                <Form.Control placeholder="phone" type="text" name="phone" id="phone" value={phone} onChange={e=>setPhone(e.target.value)}/><br/>
                </FloatingLabel>
                <FloatingLabel label="Date of Admission" className="mb-2">
                <Form.Control placeholder="date" type="date" name="date_of_admission" id="date_of_admission" value={date_of_admission} onChange={e=>setDate_of_admission(e.target.value)}/><br/>
                </FloatingLabel>
                <Stack gap={2} className="d-flex align-items-center mb-5">
                <Button style={{background:"#22C53C"}} className="col-10 border-white" type="submit">Submit</Button>
                <Button style={{background:"#C55322"}} onClick={()=>{
                    window.location.href="/"
                }
                } 
                className="col-10 border-white" type="button">Cancel</Button>
                </Stack>
                </Form.Group>
                </Form>
        </Modal.Dialog>
        </div></>
    )
}

export default Update