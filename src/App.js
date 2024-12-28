/* eslint-disable */
import './App.css';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import data from './data.js'
import { useState } from 'react';

function App() {
  let [shoes] = useState(data);
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className = "main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map(function(data,i){
            return (<ShoesInfo data = {data} number={i+1}/>);
          })}
        </div>
      </div>
    </div>
  );
}

function ShoesInfo(props){
  return (
    <div className="col-md-4">
            <img src={"https://codingapple1.github.io/shop/shoes"+props.number+".jpg"} width="80%"></img>
            <h4>{props.data.title}</h4>
            <p>{props.data.price}</p>
          </div>
  )
}

export default App;
