import React, { useState,useEffect } from 'react'
import { Table,Button,Modal,Form } from 'react-bootstrap';
import {RiDeleteBin5Fill,RiEdit2Fill,RiAddCircleFill} from 'react-icons/ri';

const Librarian = () => {
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [actionID, setActionID] = useState("");
    const [items,setItems] = useState([]);
    const [toUpdate, setToUpdate] = useState([])
    useEffect(() => {
        const database =
          fetch('http://localhost:4000/employeeList')
          .then(res => res.json())
          .then(datum => {
              setItems(datum);
        })
        return database
      },[])
    const deleteHandler = () => {
        fetch('http://localhost:4000/employee/delete/'+actionID, {
            method: 'DELETE'
          })
        setDeleteModalShow(false)
        document.getElementById("link").click();
    }
    const onClickDeleteHandler = (id) => {
        setActionID(id)
        setDeleteModalShow(true)
    }
    const updateHandler = () => {
        let data = {
            employee_name: document.getElementById("updateName").value
          }
          console.log(data)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/employee/update/'+document.getElementById("updateID").value, requestOptions);
        setUpdateModalShow(false)
        document.getElementById("link").click();
    }
    const onClickUpdateHandler = (record) => {
        setUpdateModalShow(true)
        setToUpdate({
            "id" : record.employee_id,
            "name" : record.employee_name,
        })
    }
    const addLibrarian = e => {
        e.preventDefault();
        let data = {
            employee_name: document.getElementById("addName").value,
          }
          fetch("http://localhost:4000/employee/add",{
            method: "POST",
            body:JSON.stringify(data),
            mode:"cors",
            headers: {"Content-type":"application/json;charset=utf-8"}})
            setModalShow(false)
            document.getElementById("link").click();
    }
    const MydModalWithGrid = (props) => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Librarian
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Librarian Full Name</Form.Label>
                        <Form.Control id= "addName" type="text" placeholder="Librarian name" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={addLibrarian}>Add Librarian</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      const UpdateRecordModal = (props) => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Update Record
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control id="updateID" defaultValue={toUpdate.id} type="text" readOnly/>

                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control id="updateName" defaultValue={toUpdate.name} type="text"/>
                    
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={updateHandler}>Update Record</Button>
            </Modal.Footer>
          </Modal>
        );
      }
        const DeleteRecordModal = (props) => {
            return (
                <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Delete Record
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={props.onHide}>Cancel</Button>
                  <Button onClick={deleteHandler}>Delete Record</Button>
                </Modal.Footer>
              </Modal>
            );
      }
    return (
        <>
        <a id="link" href="/Librarians"></a>
        <Button onClick={() => setModalShow(true)} className="Add-Item" variant="primary"><RiAddCircleFill/>Add New</Button>
        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        <UpdateRecordModal show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
        <DeleteRecordModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Librarian ID</th>
            <th>Librarian Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                items.map(item => (
                    <tr className="columns" key={item.employee_id}>
                        <td className="Books logData">{item.employee_id}</td>
                        <td className="Books logData">{item.employee_name}</td>
                        <td><RiDeleteBin5Fill onClick={() => onClickDeleteHandler(item.employee_id)}/> | <RiEdit2Fill onClick={() => onClickUpdateHandler(item)}/></td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
    </>
    )
}

export default Librarian
