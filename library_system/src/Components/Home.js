import React, { useState,useEffect } from 'react'
import { Button,Modal,Form,Card } from 'react-bootstrap';

const Home = () => {
    const [borrowModalShow, setBorrowModalShow] = useState(false);
    const [items,setItems] = useState([]);
    const [toUpdate, setToUpdate] = useState([])
    useEffect(() => {
        const books =
          fetch('http://localhost:4000/books/borrow')
          .then(res => res.json())
          .then(datum => {
              setItems(datum);
        })
        return books
      },[])
      const borrowBook = () => {
        let data = {
            book_id: document.getElementById("updateID").value,
            user_id: document.getElementById("selectUser").value,
            employee_id: document.getElementById("selectEmployee").value,
            date_borrowed: document.getElementById("borrowDate").value
          }
          console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/logs/add', requestOptions);
        const requestOptions2 = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4000/books/update/stocksSub/'+document.getElementById("updateID").value, requestOptions2);
        setBorrowModalShow(false)
        document.getElementById("link").click();
    }
    const onClickUpdateHandler = (record) => {
        setBorrowModalShow(true)
        setToUpdate({
            "bookId" : record.book_id,
            "bookName" : record.book_name,
            "author": record.book_author,
            "stocks":record.stocks,
        })
    }
      const BorowBookModal = (props) => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Borrow Book
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control id="updateID" defaultValue={toUpdate.bookId} type="text" readOnly/>

                    <Form.Label>Book Title</Form.Label>
                    <Form.Control id="updateTitle" defaultValue={toUpdate.bookName} type="text" readOnly/>
                </Form.Group>
                <Dropdowns></Dropdowns>
                <Form.Label>Borrow Date</Form.Label>
                <Form.Control id="borrowDate" defaultValue={toUpdate.bookName} type="date"/>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={borrowBook}>Borrow</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    return (
    <>
    <a id="link" href="/"></a>
    <BorowBookModal show={borrowModalShow} onHide={() => setBorrowModalShow(false)} />
    {
        items.map(item => (
            <Card style={{ width: '18rem' }} key={item.book_id}>
            <Card.Body>
                <Card.Title>{item.book_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author : {item.book_author}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Book ID : {item.book_id}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Stocks : {item.stocks}</Card.Subtitle>
                <Button onClick={()=>onClickUpdateHandler(item)}>Borrow Book</Button>
            </Card.Body>
            </Card>
        ))
    }
        
    </>
    )
}
const Dropdowns = () => {
    const [users,setUsers] = useState([]);
    const [employees,setEmployees] = useState([]);
      useEffect(() => {
        const emp =
          fetch('http://localhost:4000/employeeList')
          .then(res => res.json())
          .then(datum => {
            setEmployees(datum);
        })
        return emp
      },[])
      useEffect(() => {
        const user =
          fetch('http://localhost:4000/usersList')
          .then(res => res.json())
          .then(datum => {
            setUsers(datum);
        })
        return user
      },[])
    return(
        <>
            <Form.Group >
                <Form.Label>Borrower</Form.Label>
                <Form.Control id="selectUser" as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    {
                        users.map(user=>(
                            <option key={user.user_id} value={user.user_id}>{user.user_fullname}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group >
                <Form.Label>Borrowed From</Form.Label>
                <Form.Control id="selectEmployee" as="select" defaultValue="Choose...">
                <option>Choose...</option>
                    {
                        employees.map(employee=>(
                            <option key={employee.employee_id} value={employee.employee_id}>{employee.employee_name}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
        </>
    )
}

export default Home
