import db from "../models/index.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import { Op } from "sequelize";


export const getSalesMen = async (req, res) => {
    try {
        const salesMan = await db.Users.findAll({
            where: { role_id: 3 }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' }
            ]
        })
        if (salesMan.length > 0) {
            res.json({ salesMen: salesMan })
        } else {
            res.json({ message: 'no salesman found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteSalesMan = async (req, res) => {
    const { id } = req.params
    try {
        const salesMan = await db.Users.findByPk(id)
        if (!salesMan) {
            return res.status(404).json({ message: 'salesman Not Found' })
        }
        await salesMan.destroy()
        res.json({ message: 'salesMan Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateSalesMan = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone_number, email, password, city_id, area_id } = req.body
    try {
        const salesMan = await db.Users.findByPk(id)
        if (!salesMan) {
            res.status(404).json({ message: 'Salesman Not Found' })
        }
        salesMan.name = name
        salesMan.address = address
        salesMan.phone_number = phone_number
        salesMan.email = email
        salesMan.password = password
        salesMan.city_id = city_id
        salesMan.area_id = area_id

        await salesMan.save()
        res.json({ message: 'Salesman Updated Successfully', salesMan });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postSalesMan = async (req, res) => {
    const salesmanId = uuidv4();
    const { name, address, phone_number, email, password, city_id, area_id, delivery_company_id } = req.body
    try {
        const existingSalesman = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { phone_number: phone_number },
                    { name: name },
                    { email: email }

                ]
            }
        })
        if (existingSalesman) {
            return res.status(400).json({ message: 'Phone number, email, or name already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newSalesman = await db.Users.create({
            name: name,
            address: address,
            phone_number: phone_number,
            email: email,
            role_id: 3,
            password: hashedPassword,
            active: true,
            city_id: city_id,
            area_id: area_id,
            salesman_id: salesmanId.slice(0, 6),
            delivery_company_id: delivery_company_id

        });
        res.json({ message: 'Salesman Created Successfully', Salesman: newSalesman });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getSalesMan = async (req, res) => {
    const id = req.params.id;
    try {
        const salesMan = await db.Users.findOne({
            where: { id }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' }
            ]
        })
        if (!salesMan) {
            return res.status(404).json({ message: 'Salesman Not Found' })
        }

        res.json({ salesMan })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}