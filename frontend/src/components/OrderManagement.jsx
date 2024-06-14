import React, { useEffect } from 'react';
import axios from 'axios'
import { ApiUrl } from '../App';
import ProductManagement from './ProductManagement';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export  function formatDateString(isoString) { //This is order date formater
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

const OrderManagement = ({currentOrder, setCurrentOrder, orders, setOrders}) => {
  const navigate = useNavigate()


  const getOrders = async () =>{
    try {
      const {data} = await axios.get(`${ApiUrl}/orders`)
    if(data){
      setOrders(data.orders)
    }
    } catch (error) {
      toast.error(error.message)  
    }
  }

  const createNewOrder = async () => {
   try {
    const {data} = await axios.post(`${ApiUrl}/orders`)
    const id = data.order._id
    navigate(`/order/${id}`)
   } catch (error) {
    toast.error(error.message)  
   }
  };

  const handleEditOrder = async (id) => {
   try {
    const {data} = await axios.get(`${ApiUrl}/orders/${id}`)
    setCurrentOrder(data.order);
    navigate(`/order/${id}`)
   } catch (error) {
     toast.error(error.message)    
   }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      if(confirm("Are you sure delete this order")){
            setOrders(orders.filter((order) => order._id !== orderId));
            const {data} = await axios.delete(`${ApiUrl}/orders/${orderId}`)
        if(!data){
          toast.error("Order deleted")
        }
      }
    } catch (error) {
      toast.error(error.message) 
    }
  };

useEffect(()=>{
getOrders()
},[])
  return (<>
   
      <h1 className="my-4">Orders</h1>
      <button className="btn btn-primary mb-4" onClick={() => createNewOrder()}>New Order</button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Customer</th>
              <th>Order Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.createdAt ? formatDateString(order.createdAt) : "DD-MM-YYYY"}</td>
                <td>{order.customerName}</td>
                <td>{order.orderAmount}</td>
                <td className="actions">
                  <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEditOrder(order._id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ProductManagement currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} orders={orders} setOrders={setOrders} /> */}
  </>
  );
};

export default OrderManagement;
