import React, { useState,useEffect } from 'react'
import { Table,Button,Modal,Form } from 'react-bootstrap';
import {RiDeleteBin5Fill,RiEdit2Fill,RiAddCircleFill} from 'react-icons/ri';
import Home from './Home'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Users = () => {
    const [modalShow, setModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [actionID, setActionID] = useState("");
    const [items,setItems] = useState([]);
    const [returnDate, setReturnDate] = useState(new Date());
    const [toUpdate, setToUpdate] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:4000/logs')
        .then(res => res.json())
        .then(datum => {
            setItems(datum);
      })
      },[])
    const deleteHandler = () => {
        alert("Record Deleted!")
        fetch('http://localhost:4000/deleteLogs/'+actionID, {
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
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date_returned: returnDate })
        };
        fetch('http://localhost:4000/updateLogs/'+toUpdate.tranId, requestOptions);
        fetch('http://localhost:4000/books/update/stocksAdd/'+toUpdate.bookId, requestOptions);
        setUpdateModalShow(false)
        document.getElementById("link").click();
    }
    const onClickUpdateHandler = (record) => {
        setUpdateModalShow(true)
        setToUpdate({
            "tranId" : record.tran_id,
            "bookId" : record.book_id,
            "bookName" : record.book_name,
            "user": record.user_fullname,
            "employee":record.employee_name,
            "dateBorrowed":record.date_borrowed,
            "dateReturned":record.date_returned,
        })
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
                Borrow a Book
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Home></Home>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Done</Button>
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
                <Form.Group controlId="formAddNewTransaction">
                    <Form.Label>Transaction ID</Form.Label>
                    <Form.Control value={toUpdate.tranId} type="text" readOnly/>
                    
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control value={toUpdate.bookId} type="text" readOnly/>

                    <Form.Label>Book Title</Form.Label>
                    <Form.Control value={toUpdate.bookName} type="text" readOnly/>
                    
                    <Form.Label>Borrower Name</Form.Label>
                    <Form.Control value={toUpdate.user} type="text" readOnly/>

                    <Form.Label>Borrowed From</Form.Label>
                    <Form.Control value={toUpdate.employee} type="text" readOnly/>
                    
                    <Form.Label>Borrow Date</Form.Label>
                    <Form.Control value={toUpdate.dateBorrowed} type="text" readOnly/>

                    <Form.Label>Return Date</Form.Label><br/>
                    <DatePicker className="form-control" selected={returnDate} onChange={date => setReturnDate(date)}></DatePicker>
                    
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
        <a id="link" href="/Transactions"></a>
        <Button onClick={() => setModalShow(true)} className="Add-Item" variant="primary"><RiAddCircleFill/>Add New</Button>
        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        <UpdateRecordModal show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
        <DeleteRecordModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Borrower Name</th>
            <th>Borrowed From</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                items.map(item => (
                    <tr className="columns" key={item.tran_id}>
                        <td className="Books logData">{item.tran_id}</td>
                        <td className="Books logData">{item.book_id}</td>
                        <td className="Books logData">{item.book_name}</td>
                        <td className="Books logData">{item.user_fullname}</td>
                        <td className="Books logData">{item.employee_name}</td>
                        <td className="Books logData">{item.date_borrowed}</td>
                        <td className="Books logData">{item.date_returned}</td>
                        <td><RiDeleteBin5Fill onClick={() => onClickDeleteHandler(item.tran_id)}/> | <RiEdit2Fill onClick={() => onClickUpdateHandler(item)}/></td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
    </>
    )
}

export default Users
