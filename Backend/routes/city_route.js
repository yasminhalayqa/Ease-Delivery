import express from "express";
import { deleteCity, getCitis, getCity, postCity, updateCity } from "../controllers/city_controller.js";

const cityRouter = express.Router();

cityRouter.get("/cities", getCitis)
cityRouter.get("/city/:id", getCity)
cityRouter.delete('/city/:id', deleteCity)
cityRouter.put('/city/:id', updateCity)
cityRouter.post('/city', postCity)
export default cityRouter;