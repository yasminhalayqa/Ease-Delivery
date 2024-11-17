import express from "express";
import { deleteDeliveryCompany, getDeliveryCompanies, getDeliveryCompany, postDeliveryCompany, updateDelivertCompanyActive, updateDeliveryCompany } from "../controllers/delivery_company_controller.js";

const userRouter = express.Router();

userRouter.get("/delivery_company", getDeliveryCompanies)
userRouter.get("/delivery_company/:id", getDeliveryCompany)
userRouter.delete('/delivery_company/:id', deleteDeliveryCompany)
userRouter.put('/delivery_company/:id', updateDeliveryCompany)
userRouter.post('/delivery_company', postDeliveryCompany)
userRouter.put('/active/delivery_company/:id', updateDelivertCompanyActive)

export default userRouter;