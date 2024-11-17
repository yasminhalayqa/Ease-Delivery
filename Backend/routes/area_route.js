import express from "express";
import { deleteArea, getArea, getAreas, postArea, updateArea } from "../controllers/area_controllers.js";

const areaRouter = express.Router();

areaRouter.get("/areas", getAreas)
areaRouter.get("/area/:id", getArea)
areaRouter.delete('/area/:id', deleteArea)
areaRouter.put('/area/:id', updateArea)
areaRouter.post('/area', postArea)
export default areaRouter;