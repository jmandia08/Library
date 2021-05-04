import React, { useState,useEffect } from 'react'
import { Table,Button,Modal,Form } from 'react-bootstrap';
import {RiDeleteBin5Fill,RiEdit2Fill,RiAddCircleFill} from 'react-icons/ri';

const Users = () => {
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [actionID, setActionID] = useState("");
    const [items,setItems] = useState([]);
    const [toUpdate, setToUpdate] = useState([])
    useEffect(() => {
        const database =
          fetch('http://localhost:4000/usersList')
          .then(res => res.json())
          .then(datum => {
              setItems(datum);
        })
        return database
      },[])
    const deleteHandler = () => {
        fetch('http://localhost:4000/user/delete/'+actionID, {
            method: 'DELETE'
          })
        setDeleteModalShow(false)
    }
    const onClickDeleteHandler = (id) => {
        setActionID(id)
        setDeleteModalShow(true)
        document.getElementById("link").click();
    }
    const updateHandler = () => {
        let data = {
            user_fullname: document.getElementById("updateName").value,
            user_address: document.getElementById("updateAddress").value
          }
          console.log(data)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/user/update/'+document.getElementById("updateID").value, requestOptions);
        setUpdateModalShow(false)
        document.getElementById("link").click();
    }
    const onClickUpdateHandler = (record) => {
        setUpdateModalShow(true)
        setToUpdate({
            "id" : record.user_id,
            "name" : record.user_fullname,
            "address" : record.user_address,
        })
    }
    const addBorrower = e => {
        e.preventDefault();
        let data = {
            user_fullname: document.getElementById("addName").value,
            user_address: document.getElementById("addAddress").value
          }
          fetch("http://localhost:4000/user/add",{
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
                Add New Borrower
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Borrower Full Name</Form.Label>
                        <Form.Control id="addName" type="text" placeholder="Borrower name" />
                        
                        <Form.Label>Borrower Address</Form.Label>
                        <Form.Control id="addAddress" type="text" placeholder="Address" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={addBorrower} >Add Borrower</Button>
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

                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control id="updateAddress" defaultValue={toUpdate.address} type="text"/>
                    
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
        <a id="link" href="/Borrowers"></a>
        <Button onClick={() => setModalShow(true)} className="Add-Item" variant="primary"><RiAddCircleFill/>Add New</Button>
        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        <UpdateRecordModal show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
        <DeleteRecordModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Borrower ID</th>
            <th>Borrower Name</th>
            <th>Borrower Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                items.map(item => (
                    <tr className="columns" key={item.user_id}>
                        <td className="Books logData">{item.user_id}</td>
                        <td className="Books logData">{item.user_fullname}</td>
                        <td className="Books logData">{item.user_address}</td>
                        <td><RiDeleteBin5Fill onClick={() => onClickDeleteHandler(item.user_id)}/> | <RiEdit2Fill onClick={() => onClickUpdateHandler(item)}/></td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
    </>
    )
}

export default Users
