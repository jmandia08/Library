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
          fetch('http://localhost:4000/books')
          .then(res => res.json())
          .then(datum => {
              setItems(datum);
        })
        return database
      },[])
    const deleteHandler = () => {
        fetch('http://localhost:4000/books/delete/'+actionID, {
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
            book_id: document.getElementById("updateID").value,
            book_name: document.getElementById("updateTitle").value,
            book_author: document.getElementById("updateAuthor").value,
            stocks: document.getElementById("updateStocks").value
          }
          console.log(data)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/books/update/'+document.getElementById("updateID").value, requestOptions);
        setUpdateModalShow(false)
        document.getElementById("link").click();
    }
    const onClickUpdateHandler = (record) => {
        setUpdateModalShow(true)
        setToUpdate({
            "bookId" : record.book_id,
            "bookName" : record.book_name,
            "author": record.book_author,
            "stocks":record.stocks,
        })
    }
    const addBook = e => {
        e.preventDefault();
        let data = {
            
            book_name: document.getElementById("addID").value,
            book_author: document.getElementById("addAuthor").value,
            stocks: document.getElementById("addQuantity").value
          }
          fetch("http://localhost:4000/books/add",{
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
                Add New Book
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control id="addID" type="text" placeholder="Book title" />
                        
                        <Form.Label>Author</Form.Label>
                        <Form.Control id="addAuthor" type="text" placeholder="Author" />

                        <Form.Label>Item Quantity</Form.Label>
                        <Form.Control id="addQuantity" type="number" placeholder="0" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={addBook}>Add Book</Button>
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
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control id="updateID" defaultValue={toUpdate.bookId} type="text" readOnly/>

                    <Form.Label>Book Title</Form.Label>
                    <Form.Control id="updateTitle" defaultValue={toUpdate.bookName} type="text"/>
                    
                    <Form.Label>Author</Form.Label>
                    <Form.Control id="updateAuthor" defaultValue={toUpdate.author} type="text"/>

                    <Form.Label>Quantity</Form.Label>
                    <Form.Control id="updateStocks" defaultValue={toUpdate.stocks} type="number"/>
                    
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
        <a id="link" href="/Books"></a>
        <Button onClick={() => setModalShow(true)} className="Add-Item" variant="primary"><RiAddCircleFill/>Add New</Button>
        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        <UpdateRecordModal show={updateModalShow} onHide={() => setUpdateModalShow(false)} />
        <DeleteRecordModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Stocks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                items.map(item => (
                    <tr className="columns" key={item.book_id}>
                        <td className="Books logData">{item.book_id}</td>
                        <td className="Books logData">{item.book_name}</td>
                        <td className="Books logData">{item.book_author}</td>
                        <td className="Books logData">{item.stocks}</td>
                        <td><RiDeleteBin5Fill onClick={() => onClickDeleteHandler(item.book_id)}/> | <RiEdit2Fill onClick={() => onClickUpdateHandler(item)}/></td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
    </>
    )
}

export default Users
