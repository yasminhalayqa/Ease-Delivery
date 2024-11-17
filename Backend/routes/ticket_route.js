import express from "express";
import { getTicket, getTickets, postTicket, updateTicket, updateTicketStatus } from "../controllers/tickets_controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/tickets", getTickets)
ticketRouter.get("/ticket/:id", getTicket)
ticketRouter.put('/ticket/:id', updateTicketStatus)
ticketRouter.post('/ticket', postTicket)
ticketRouter.put('/edit_ticket/:id', updateTicket)

export default ticketRouter;