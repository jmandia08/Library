import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './Home'
import Books from './Books'
import Librarians from './Librarian'
import Borrowers from './Users'
import Transactions from './Transactions'

const MainPage = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Borrow Book</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Books">Books</Nav.Link>
                        <Nav.Link href="/Borrowers">Borrowers</Nav.Link>
                        <Nav.Link href="/Librarians">Librarians</Nav.Link>
                        <Nav.Link href="Transactions">Transactions</Nav.Link>
                    </Nav>
            </Navbar>
            
             <Router>
                 <Switch>
                     <Route path="/" exact component={Home}></Route>
                     <Route path="/Books" exact component={Books}></Route>
                     <Route path="/Borrowers" exact component={Borrowers}></Route>
                     <Route path="/Librarians" exact component={Librarians}></Route>
                     <Route path="/Transactions" exact component={Transactions}></Route>
                 </Switch>
             </Router>
        </div>
    )
}

export default MainPage
