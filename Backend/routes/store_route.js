import express from "express";
import { deleteStore, getStore, getStores, postStore, updateStore } from "../controllers/store_controller.js";

const storeRouter = express.Router();

storeRouter.get("/store", getStores)
storeRouter.get("/store/:id", getStore)
storeRouter.delete('/store/:id', deleteStore)
storeRouter.put('/store/:id', updateStore)
storeRouter.post('/store', postStore)
export default storeRouter;