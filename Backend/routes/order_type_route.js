import express from "express";
import { deleteOrderType, getOrdersTypes, postOrderType } from "../controllers/order_type_controller.js";

const orderTypeRouter = express.Router();
orderTypeRouter.get('/order_type', getOrdersTypes)
orderTypeRouter.post('/order_type', postOrderType)
orderTypeRouter.delete('/order_type/:id', deleteOrderType)

export default orderTypeRouter;
