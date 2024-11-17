import express from "express";
import { deleteSalesMan, getSalesMan, getSalesMen, postSalesMan, updateSalesMan } from "../controllers/salesman_controller.js";

const salesManRouter = express.Router();

salesManRouter.get("/salesman", getSalesMen)
salesManRouter.get("/salesman/:id", getSalesMan)
salesManRouter.delete('/salesman/:id', deleteSalesMan)
salesManRouter.put('/salesman/:id', updateSalesMan)
salesManRouter.post('/salesman', postSalesMan)
export default salesManRouter;