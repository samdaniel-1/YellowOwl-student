import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function Insert() {
  const [date,setDate] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let key = {
      name: name,
      email: email,
      phone: phone,
      enroll_number: Math.floor(Math.random()*10000000000,0),
      date_of_admission: date
    };
    axios.post("http://localhost:4009/post", key).then((res) => {
      if (res.data.status === "inserted") {
        console.log("Inserted");
        alert("values are inserted");
        window.location.href = "/";
      } else {
        console.log("Values not inserted");
        alert("values are not inserted there is something wrong");
      }
    });
  };

  return (
    <>
      <div
        className="modal show p-5"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog className="rounded-3" style={{boxShadow:"1px 1px 5px grey"}}>
          <Modal.Header className="border-white">
            <Modal.Title>
              <b>Add New Student</b>
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit} className="px-5 p-3">
            <Form.Group>
              <FloatingLabel label="Name" className="mb-2">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter your name here"
                />
                <br />
              </FloatingLabel>
              <FloatingLabel label="Email" className="mb-2">
                <Form.Control type="text" placeholder="email" id="email" />
                <br />
              </FloatingLabel>
              <FloatingLabel label="Phone" className="mb-2">
                <Form.Control placeholder="phone" type="text" id="phone" />
                <br />
              </FloatingLabel>
              <FloatingLabel label="Date of Admission" className="mb-2">
                <Form.Control
                  placeholder="Date of Admission"
                  type="date"
                  id="date_of_admission"
                  onChange={e=>setDate(e.target.value)}
                />
                <br />
              </FloatingLabel>
              <Stack
                gap={2}
                className="d-flex flex-column align-items-center mb-5"
              >
                <Button
                  className="col-10 border-white"
                  type="submit"
                  value="Submit"
                  style={{ background: "#22C53C" }}
                  onClick={(a) => {
                    console.log(a);
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={()=>window.location.href="/"}
                  className="col-10 border-white"
                  style={{ background: "#C55322" }}> 
                Cancel
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default Insert;
