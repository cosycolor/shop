/* eslint-disable */
import './App.css';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import data from './data.js'
import { useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom';
import styled from 'styled-components';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();


  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick = {() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick = {() => {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick = {() => navigate('/about')}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element = {<MainPage shoes={shoes}/>}/>
        <Route path="/detail/:id" element = {<DetailInfo shoes = {shoes} />}/>
        <Route path="/about" element = {<About />}>
          <Route path="member" element = {<div><span style={{backgroundColor : "red"}}>멤버들</span></div>}/>
          <Route path="location" element = {<div><span style={{backgroundColor : "red"}}>회사위치</span></div>}/>
        </Route>
        <Route path="*" element = {<div>404 PAGE</div>}/>
        <Route path="/event" element = { <Event />}>
          <Route path="one" element = {<p>첫 주문시 양배추즙 서비스</p>}/>
          <Route path="two" element = {<p>생일기념 쿠폰받기</p>}/>
        </Route>
      </Routes>
    </div>
    
  );
}

function Event(){
  return (
    <div>오늘의 이벤트
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return (
    <div>
      <h4>about 페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}

function MainPage(props){
  return (
    <>
    <div className = "main-bg"></div>
      <div className="container">
        <div className="row">
          {props.shoes.map(function(data,i){
            return (<ShoesInfo data = {data} number={i+1}/>);
          })}
        </div>
      </div>
    </>
  )}

function DetailInfo(props){
  let {id} = useParams();
  let product = props.shoes.find((x)=> x.id == id);
  return(
  <div className="container">
    <div className="row">
    <div className="col-md-6">
      <img src={"https://codingapple1.github.io/shop/shoes"+(Number(product.id)+1)+".jpg"} width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{product.title}</h4>
      <p>{props.shoes[id].content}</p>
      <p>{props.shoes[id].price}</p>
      <button className="btn btn-danger">주문하기</button> 
    </div>
    </div>
  </div> 
  )
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
