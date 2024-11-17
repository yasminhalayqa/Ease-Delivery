import db from "../models/index.js"

export const getOrdersTypes = async (req, res) => {
    try {
        const orderType = await db.OrderTypes.findAll()
        if (orderType.length > 0) {
            res.json({ orderTypes: orderType })
        } else {
            res.json({ message: 'no orderType found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteOrderType = async (req, res) => {
    const { id } = req.params
    try {
        const orderType = await db.OrderTypes.findByPk(id)
        if (!orderType) {
            return res.status(404).json({ message: 'Order Type Not Found' })
        }
        await orderType.destroy()
        res.json({ message: 'Order Type Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}


export const postOrderType = async (req, res) => {
    const { name, delivery_company_id
    } = req.body
    try {
        const newOrderType = await db.OrderTypes.create({
            name: name,
            delivery_company_id : delivery_company_id
        });
        res.json({ message: 'Order Type Created Successfully', order: newOrderType });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

