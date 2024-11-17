import db from "../models/index.js"

export const getTickets = async (req, res) => {
    try {
        const ticket = await db.Tickets.findAll()
        if (ticket.length > 0) {
            res.json({ tickets: ticket })
        } else {
            res.json({ message: 'no ticket found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// export const deleteCity = async (req, res) => {
//     const { id } = req.params
//     try {
//         const city = await db.Cities.findByPk(id)
//         if (!city) {
//             return res.status(404).json({ message: 'City Not Found' })
//         }
//         await city.destroy()
//         res.json({ message: 'City Deleted Successfully' })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal server error' });

//     }
// }

export const updateTicketStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    try {
        const ticket = await db.Tickets.findByPk(id)
        if (!ticket) {
            res.status(404).json({ message: 'ticket Not Found' })
        }
        ticket.status = status
        await ticket.save()
        res.json({ message: 'ticket Updated Successfully', ticket });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body
    try {
        const ticket = await db.Tickets.findByPk(id)
        if (!ticket) {
            res.status(404).json({ message: 'ticket Not Found' })
        }
        ticket.title = title
        ticket.description = description
        await ticket.save()
        res.json({ message: 'ticket Updated Successfully', ticket });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const postTicket = async (req, res) => {
    const { title, store_id, delivery_company_id, description, status } = req.body
    try {
        const newTicket = await db.Tickets.create({
            title: title,
            store_id: store_id,
            delivery_company_id: delivery_company_id,
            description: description,
            status: "جديدة"
        });
        res.json({ message: 'Ticket Created Successfully', Ticket: newTicket });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTicket = async (req, res) => {
    const ticket_id = req.params.id;
    try {
        const ticket = await db.Tickets.findOne({ where: { ticket_id } })
        if (!ticket) {
            return res.status(404).json({ message: 'ticket Not Found' })
        }
        res.json({ ticket })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}