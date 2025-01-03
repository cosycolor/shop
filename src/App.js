/* eslint-disable */
import './App.css';
import { Button, Container, Navbar, Nav, Form, InputGroup } from 'react-bootstrap';
import data from './data.js';
import { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cart from './routes/Cart.js';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(0);
  let [status, setStatus] = useState(false);


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
      <button onClick={ () => {
        setStatus(true);
        if(clickCount < 1){
          axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result) =>{
          // let tmpA = [...shoes];
          // let tmpB = result.data;
          // setShoes(tmpA.concat(tmpB));
          let copy = [...shoes, ...result.data];
          setShoes(copy);
          setClickCount(clickCount+1);
          setStatus(false);
        })
        .catch(()=>{
          console.log('fail');
        })
        }else if(clickCount >= 1 && clickCount < 2){
          setStatus(true);
          axios.get('https://codingapple1.github.io/shop/data3.json')
          .then((result) =>{
            let copy = [...shoes, ...result.data];
            setShoes(copy);
            setClickCount(clickCount+1);
            setStatus(false);
          })
        }else{
          alert('없습니다 신발이')
        }
      }}>{status == true ? '로딩중' : '더보기'}</button>
      
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
        <Route path="/cart" element={ <Cart/> }/>
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
  let [style, setStyle] = useState(false);
  let [count, setCount] = useState(0);
  let [text, setText] = useState('');
  let [name, setName] = useState('');
  let [tabs, setTabs] = useState(0);
  let [fade2, setFade2] = useState('');

  useEffect(()=>{
    setFade2('end')
  },[props.id]);

function TabContent(){
  let [fade, setFade] = useState('');
  useEffect(()=>{
    setFade('end')
  },[tabs]);

  if(tabs == 0){
    return <div className = {"start "+ fade}>내용 0</div>
  }

  if(tabs == 1){
    return <div className = {"start "+ fade}>내용 1</div>
  }

  if(tabs == 2){
    return <div className = {"start "+ fade}>내용 2</div>
  }
}
  // useEffect(()=>{
  //   let timer = setTimeout(()=>{
  //     style = setStyle(!style);
  //   },2000);
  //   console.log(count)
  //   return () =>{
  //     clearTimeout(timer);
  //   }
  // },[count])

  function changeText(e){
    setStyle(e.target.value);
    console.log(style);
  }
  
  useEffect(()=>{
    if(isNaN(style) == true){
      setStyle(true)
    }
  },[style])

  
  let {id} = useParams();
  let product = props.shoes.find((x)=> x.id == id);
  return(
  <div className={"container start "+fade2}>
    <input type='text' name='test' onChange={changeText}></input>
    
    {/* <div className = "alert alert-warning" style={style == true ? {display : 'none'} : {display :  'block'}}>2초 이내 구매시 할인</div> */}
    {
        <div className = "alert alert-warning" style={style == true ? {display : 'block'} : {display :  'none'}}>그러지마세요</div>
    }
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
    <Nav variant="tabs" defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={()=>{setTabs(0)}}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1" onClick={()=>{setTabs(1)}}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={()=>{setTabs(2)}}>버튼2</Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent />
  </div> 
  )
}

function ShoesInfo(props){
  return (
    <div className="col-md-4" onClick = { () => {<DetailInfo />}}>
            <img src={"https://codingapple1.github.io/shop/shoes"+props.number+".jpg"} width="80%"></img>
            <h4>{props.data.title}</h4>
            <p>{props.data.price}</p>
          </div>
  )
}

export default App;
