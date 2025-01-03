import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge, addCount } from "./../store.js"

function Cart(){

  let dispatch = useDispatch();

  let cart = useSelector((state) => { return state.cart})
  let user = useSelector((state) => { return state.user})
  
  

  return (
    <div>
      {user.age}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map(function(data,i){
              return ( <CartItem dispatch={dispatch} data={data}/>)
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

function CartItem(props){
  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.name}</td>
      <td>{props.data.count}</td>
      <td><button onClick={()=>{
        props.dispatch(addCount(props.data.id))}}>+</button></td>
    </tr>
  )
}
export default Cart;