import { Op } from "sequelize"
import db from "../models/index.js"

export const postCustomer = async (req, res) => {
    const { name, phone_number, email, city_id, area_id, delivery_company_id } = req.body
    try {
        const existingCustomer = await db.Customers.findOne({
            where: {
                [Op.or]: [
                    { phone_number: phone_number },
                    { email: email }
                ]
            }
        })
        if (existingCustomer) {
            return res.status(400).json({ message: 'Phone number OR email already exists' });
        }
        const newCustomer = await db.Customers.create({
            name: name,
            phone_number: phone_number,
            email: email,
            city_id: city_id,
            area_id: area_id,
            delivery_company_id: delivery_company_id

        });
        res.json({ message: 'Customer Created Successfully', customer: newCustomer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCustomer = async (req, res) => {
    const customer_id = req.params.id;
    try {
        const customer = await db.Customers.findOne({
            where: { customer_id }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' },
            ]
        })
        if (!customer) {
            return res.status(404).json({ message: 'Customer Not Found' })
        }
        const { city, area, ...customerData } = customer.toJSON();

        const response = {
            ...customerData,
            city: city ? city.name : null,
            area: area ? area.name : null
        };

        res.json({ response })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await db.Customers.findAll({
            include: [{ model: db.Cities, as: 'city' }, { model: db.Areas, as: 'area' }]
        })
        if (customers.length > 0) {
            const customer = customers.map(customer => ({
                ...customer.toJSON(),
                city: customer.city.name,
                area: customer.area.name
            }))
            res.json({ customers: customer })
        }
        else {
            res.json({ message: 'No customer found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

