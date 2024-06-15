import React, { useState } from 'react'
import OrderManagement from './components/OrderManagement'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductManagement from './components/ProductManagement';


// export const ApiUrl = "http://localhost:8000"
export const ApiUrl = "https://super-market-backend-plum.vercel.app"

const App = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    orderId: '',
    orderDate: '',
    customerName: '',
    items: [],
    orderAmount: 0,
  });

  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderManagement currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} orders={orders} setOrders={setOrders}/>}></Route>
        <Route path='/order/:id' element={<ProductManagement currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} orders={orders} setOrders={setOrders}/>}></Route>
        <Route path='/*' element={<Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App