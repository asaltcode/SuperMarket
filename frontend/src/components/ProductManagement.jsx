import React, { useEffect, useState } from "react";
import { ApiUrl } from "../App";
import axios from "axios";
import { formatDateString } from "./OrderManagement";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductManagement = ({ currentOrder, setCurrentOrder }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const params = useParams();

  // Initial form values
  let [initialValues, setInitialValues] = useState({
    orderId: "",
    orderAmount: 0,
    customerName: "",
    items: [],
    createdAt: "",
  });

  // Formik setup for form handling and validation
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      // Add your validation schema here
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const id = params.id;
        values.orderAmount = currentOrder.orderAmount;
        values.items = currentOrder.items;
        console.log(values);
        const { data } = await axios.put(`${ApiUrl}/orders/${id}`, values);
        if (data) {
          toast.success("Order saved");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  // Function to add a new item to the order
  const handleAddItem = () => {
    setCurrentOrder({
      ...currentOrder,
      items: [
        ...currentOrder.items,
        { itemName: "", unitPrice: 0, quantity: 1, amount: 0 },
      ],
    });
  };

  // Function to handle changes in item details
  const handleItemChange = (index, field, value) => {
    const items = [...currentOrder.items];
    items[index][field] = value;
    items[index].amount = items[index].unitPrice * items[index].quantity;

    setCurrentOrder({
      ...currentOrder,
      items,
      orderAmount: items.reduce((sum, item) => sum + item.amount, 0),
    });
  };

  // Function to delete an item from the order
  const handleDeleteItem = (index) => {
    const items = [...currentOrder.items];
    items.splice(index, 1);
    setCurrentOrder({
      ...currentOrder,
      items,
      orderAmount: items.reduce((sum, item) => sum + item.amount, 0),
    });
  };

  // Function to handle cancel action
  const handleCancel = () => {
    navigate("/");
  };

  // Function to fetch all products from the server
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${ApiUrl}/product`);
      setProducts(data.product);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to handle changes in product selection
  const handleProductChange = (index, field, id) => {
    const items = [...currentOrder.items];
    const product = products.filter((val) => val._id === id);
    items[index][field] = product[0].price;
    items[index].amount = items[index].unitPrice * items[index].quantity;
    setCurrentOrder({
      ...currentOrder,
      items,
      orderAmount: items.reduce((sum, item) => sum + item.amount, 0),
    });
    handleItemChange(index, "itemName", product[0].name);
  };

  // Function to fetch order details by ID
  const getOrderById = async (id) => {
    try {
      const { data } = await axios.get(`${ApiUrl}/orders/${id}`);
      setInitialValues(data.order);
      setCurrentOrder(data.order);
      navigate(`/order/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch products and order details on component mount
  useEffect(() => {
    getAllProducts();
    getOrderById(params.id);
  }, []);

  return (
    <>
      <div className="card my-4">
        {/* Form to handle new or edit order */}
        <form onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <h2>New/Edit Order</h2>
            {/* Order ID input field (read-only) */}
            <div className="form-group">
              <label>Order Id:</label>
              <input
                className="form-control"
                type="text"
                name="orderId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.orderId}
                readOnly
              />
            </div>
            {/* Order date input field (read-only) */}
            <div className="form-group">
              <label>Order Date:</label>
              <input
                className="form-control"
                type="text"
                name="createdAt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
                value={formatDateString(formik.values.createdAt)}
              />
            </div>
            {/* Customer name input field */}
            <div className="form-group">
              <label>Customer:</label>
              <input
                className="form-control"
                type="text"
                name="customerName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customerName}
              />
            </div>
            <h3>Items</h3>
            <div className="table-responsive">
              {/* Table to list order items */}
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {/* Dropdown to select item */}
                        <select
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "unitPrice",
                              e.target.value
                            )
                          }
                          className="form-control"
                        >
                          <option defaultValue>Select Items</option>
                          {products?.map((product, i) => (
                            <option
                              key={i}
                              value={product._id}
                              selected={product.name === item.itemName}
                            >
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {/* Unit price input field (read-only) */}
                        <input
                          className="form-control"
                          type="text"                        
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(index, "unitPrice", e.target.value > 0 ? e.target.value : 1)
                          }
                        />
                      </td>
                      <td>
                        {/* Quantity input field */}
                        <input
                          className="form-control"
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              e.target.value > 0 ? parseInt(e.target.value) : 1
                            )
                          }
                        />
                      </td>
                      <td>
                        {/* Amount input field (read-only) */}
                        <input  className="form-control"  type="number" value={item.amount}
                          readOnly
                        />
                      </td>
                      <td>
                        {/* Delete item button */}
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Button to add a new item */}
            <button
              className="btn btn-secondary mb-3"
              type="button"
              onClick={handleAddItem}
            >
              Add Item
            </button>
            {/* Display order amount */}
            <h3>Order Amount: {currentOrder.orderAmount}</h3>
            {/* Save and Cancel buttons */}
            <button className="btn btn-success" type="submit">
              Save
            </button>
            &nbsp; &nbsp;
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductManagement;
