import express from "express";
import { deleteOrder, generateCollectionReceipt, getInvoices, getOrder, getOrderInvoice, getOrders, getOrdersStatus, postOrder, updateOrder, updateOrderInvoice, updateOrderStatus } from "../controllers/order_controller.js";

const orderRouter = express.Router();
orderRouter.get('/order', getOrders)
orderRouter.post('/order', postOrder)
orderRouter.put('/order/:id', updateOrder)
orderRouter.delete('/order/:id', deleteOrder)
orderRouter.get('/order/:id', getOrder)
orderRouter.put('/order_status/:id', updateOrderStatus)
orderRouter.put('/invoice_status/:id', updateOrderInvoice)
orderRouter.get('/invoice/:id', getOrderInvoice)
orderRouter.get('/invoices', getInvoices)
orderRouter.get('/order_status_tracking', getOrdersStatus)
orderRouter.post('/generate-collection-receipts', generateCollectionReceipt);



export default orderRouter;
