import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Modal  from "react-bootstrap/Modal"
import { Link } from "react-router-dom";

function Delete(){
    const {proid} = useParams()
    const [name,setName] = useState([])
    return(
        <div className="modal show" style={{display:"block",position:'initial'}}>
    <Modal.Dialog className="text-center rounded-3" style={{boxShadow:"1px 1px 5px grey",marginTop:"20%"}}>
        <Modal.Body>
            <p><b>Are you sure to delete this student?</b></p>
        </Modal.Body>

        <div className="m-2">
        <Button style={{background: "#22C53C"}} className="col-5 m-3 border-light" onClick={()=>{
            
                axios.get(`https://backend-2-43qa.onrender.com/deleted/${proid}`)
                .then((res)=>setName(res.data))
                window.location.href = '/'
        
            
        }}>Yes</Button>
        <Link to="/"><Button style={{background: "#C55322"}} className="col-5 border-light">No</Button></Link>
        </div>
    </Modal.Dialog>
     </div>
    )
}

export default Delete
