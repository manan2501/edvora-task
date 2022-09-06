import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getProductByID, getUserByID } from "./helper";
import "./App.css";

const App = () => {
        const [orders, setOrders] = useState([]);
        const [users, setUsers] = useState([]);
        const [products, setProducts] = useState([]);
        async function getData() {
                try {
                        const { data: ordersData } = await axios.get(
                                "https://assessment.api.vweb.app/orders"
                        );
                        const { data: usersData } = await axios.get(
                                "https://assessment.api.vweb.app/users"
                        );
                        const { data: productsData } = await axios.get(
                                "https://assessment.api.vweb.app/products"
                        );
                        setOrders(ordersData);
                        setUsers(usersData);
                        setProducts(productsData);
                } catch (error) {
                        console.log(error);
                }
        }
        useEffect(() => {
                getData();
        }, []);
        useEffect(() => {
                console.log("ORDERS", orders);
                console.log("USERS", users);
                console.log("PRODUCTS", products);
        }, [orders, users, products]);
        return (
                <div>
                        <h1 className="text-center">Orders</h1>
                        <Table striped bordered hover>
                                <thead>
                                        <tr>
                                                <th>Order ID</th>
                                                <th>Order Value</th>
                                                <th>Product Name</th>
                                                <th>Order Qty</th>
                                                <th>In Stock</th>
                                                <th>Price</th>
                                                <th>Ordered By</th>
                                                <th>Date and Time</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {orders.map((item) => {
                                                return (
                                                        <tr>
                                                                <td>
                                                                        {
                                                                                item.order_id
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {item.quantity *
                                                                                getProductByID(
                                                                                        {
                                                                                                id: item.product_id,
                                                                                                products: products,
                                                                                        }
                                                                                )
                                                                                        .selling_price}
                                                                </td>
                                                                <td>
                                                                        {
                                                                                getProductByID(
                                                                                        {
                                                                                                id: item.product_id,
                                                                                                products: products,
                                                                                        }
                                                                                )
                                                                                        .name
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {
                                                                                item.quantity
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {
                                                                                getProductByID(
                                                                                        {
                                                                                                id: item.product_id,
                                                                                                products: products,
                                                                                        }
                                                                                )
                                                                                        .stock
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {
                                                                                getProductByID(
                                                                                        {
                                                                                                id: item.product_id,
                                                                                                products: products,
                                                                                        }
                                                                                )
                                                                                        .selling_price
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {
                                                                                getUserByID(
                                                                                        {
                                                                                                id: item.user_id,
                                                                                                users: users,
                                                                                        }
                                                                                )
                                                                                        .name
                                                                        }
                                                                </td>
                                                                <td>
                                                                        {new Date(
                                                                                JSON.parse(
                                                                                        item.order_date
                                                                                )
                                                                        ).toLocaleString()}
                                                                </td>
                                                        </tr>
                                                );
                                        })}
                                </tbody>
                        </Table>
                </div>
        );
};

export default App;
