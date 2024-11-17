import db from "../models/index.js"
import nodemailer from "nodemailer";

export const getOrders = async (req, res) => {
    try {
        const order = await db.Orders.findAll({
            include: [{
                model: db.Customers,
                include: [
                    { model: db.Cities },
                    { model: db.Areas }
                ]
            }]
        })
        if (order.length > 0) {
            res.json({ orders: order })
        } else {
            res.json({ message: 'no order found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await db.Orders.findByPk(id)
        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' })
        }
        await order.destroy()
        res.json({ message: 'Order Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { order_code,
        deliver_date,
        status,
        type,
        customer_id,
        source,
        city,
        area,
        store_name,
        total_amount,
        notes,
        qty,
        shipping_fees,
        salesman_id,
        salesman_phone
    } = req.body
    try {
        const order = await db.Orders.findByPk(id)
        if (!order) {
            res.status(404).json({ message: 'Order Not Found' })
        }
        // order.order_code = order_code
        // order.deliver_date = deliver_date
        order.status = status
        order.salesman_id = salesman_id
        order.salesman_phone = salesman_phone
        // order.type = type
        // order.source = source
        // order.city_id = city
        // order.area_id = area
        // order.store_name = store_name
        // order.total_amount = total_amount
        // order.notes = notes
        // order.qty = qty
        // order.customer_id = customer_id
        // order.shipping_fees = shipping_fees

        await order.save()
        res.json({ message: 'Order Updated Successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postOrder = async (req, res) => {
    const { order_code,
        deliver_date,
        status,
        order_type_id,
        source,
        store_name,
        total_amount,
        notes,
        qty,
        salesman_id,
        store_id,
        store_phone,
        salesman_phone,
        customer_id,
        shipping_fees,
        delivery_company_id
    } = req.body
    try {
        const newOrder = await db.Orders.create({
            order_code: order_code,
            deliver_date: deliver_date,
            status: status,
            order_type_id: order_type_id,
            source: source,
            customer_id: customer_id,
            store_name: store_name,
            total_amount: total_amount,
            notes: notes,
            qty: qty,
            salesman_id: salesman_id,
            store_id: store_id,
            store_phone: store_phone,
            salesman_phone: salesman_phone,
            shipping_fees: shipping_fees,
            delivery_company_id: delivery_company_id

        });
        const order_id = newOrder.order_id

        await db.OrderStatusTracking.create({ order_id: order_id, status, timestamp: new Date() });

        // const newInvoice = await db.OrderDetails.create({
        //     invoice_id: newOrder.order_id,
        //     payment_status: 'قيد الانتظار',
        //     order_id: newOrder.order_id
        // })
        res.json({ message: 'Order Created Successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrder = async (req, res) => {
    const order_id = req.params.id;
    try {
        const order = await db.Orders.findOne({
            where: { order_id }, include: [{
                model: db.Customers,
                include: [
                    { model: db.Cities },
                    { model: db.Areas }
                ]
            }]
        })
        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' })
        }
        res.json({ order })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const {
        status,
    } = req.body
    try {
        const order = await db.Orders.findByPk(id)
        if (!order) {
            res.status(404).json({ message: 'Order Not Found' })
        }

        order.status = status

        await order.save()
        await db.OrderStatusTracking.create({ order_id: id, status, timestamp: new Date() });

        res.json({ message: 'Order Updated Successfully', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrdersStatus = async (req, res) => {
    try {
        const order = await db.OrderStatusTracking.findAll()
        if (order.length > 0) {
            res.json({ orders: order })
        } else {
            res.json({ message: 'no order found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrderInvoice = async (req, res) => {
    const invoice_id = req.params.id;
    try {
        const invoice = await db.OrderDetails.findOne({ where: { invoice_id: invoice_id }});
        if (!invoice) { 
            return res.status(404).json({ message: 'Invoice not found for the given order' });
        }
        res.json({ invoice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateOrderInvoice = async (req, res) => {
    const invoice_id = req.params.id;
    const { payment_status } = req.body;
    try {
        const invoice = await db.OrderDetails.findOne({ where: { invoice_id: invoice_id } });
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found for the given order' });
        }

        invoice.payment_status = payment_status
        await invoice.save();
        res.json({ message: 'Invoice details updated successfully', invoice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await db.OrderDetails.findAll()
        if (invoices.length > 0) {
            res.json({ invoices: invoices });
        } else {
            res.json({ message: 'No invoices found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const generateCollectionReceipt = async (req, res) => {
    const {
        order_ids,
        delivery_company_id,
        store_id,
    } = req.body
    try {

        const newInvoice = await db.OrderDetails.create({
            payment_status: 'Pending',
            collection_receipt_status: 'Pending',
            receipt_date: new Date(),
            delivery_company_id: delivery_company_id,
            store_id: store_id,
        });

        const invoice_id = newInvoice.invoice_id

        await db.Orders.update(
            { invoice_id: invoice_id },
            { where: { order_id: order_ids } }
        )
        res.json({ message: 'Invoice Created Successfully', newInvoice: newInvoice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}