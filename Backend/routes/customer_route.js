import express from "express";
import { getCustomer, getCustomers, postCustomer } from "../controllers/customer_controller.js";

const customerRouter = express.Router();

customerRouter.get("/customer/:id", getCustomer)
customerRouter.post('/customer', postCustomer)
customerRouter.get('/customer', getCustomers)


export default customerRouter;