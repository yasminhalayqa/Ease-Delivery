import db from "../models/index.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import { Op } from "sequelize";

export const getStores = async (req, res) => {
    try {
        const store = await db.Users.findAll({
            where: { role_id: 4 }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' }
            ]
        })
        if (store.length > 0) {
            res.json({ stores: store })
        } else {
            res.json({ message: 'no store found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteStore = async (req, res) => {
    const { id } = req.params
    try {
        const store = await db.Users.findByPk(id)
        if (!store) {
            return res.status(404).json({ message: 'Store Not Found' })
        }
        await store.destroy()
        res.json({ message: 'Store Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateStore = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone_number, email, password, logo, compnay_branches_num, compnay_order_num, city_id, area_id } = req.body
    try {
        const store = await db.Users.findByPk(id)
        if (!store) {
            res.status(404).json({ message: 'Store Not Found' })
        }
        store.name = name
        store.address = address
        store.phone_number = phone_number
        store.email = email
        store.password = password
        // store.logo = logo
        store.compnay_branches_num = compnay_branches_num
        store.compnay_order_num = compnay_order_num
        store.city_id = city_id
        store.area_id = area_id

        await store.save()
        res.json({ message: 'Store Updated Successfully', store });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postStore = async (req, res) => {
    const { name, address, phone_number, email, password, logo, compnay_branches_num, compnay_order_num, city_id, area_id, delivery_company_id } = req.body
    const storeId = uuidv4();

    try {
        const existingStore = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { phone_number: phone_number },
                    { name: name },
                    { email: email }
                ]
            }
        })
        if (existingStore) {
            return res.status(400).json({ message: 'Phone number, email, or name already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newStore = await db.Users.create({
            name: name,
            address: address,
            phone_number: phone_number,
            email: email,
            role_id: 4,
            password: hashedPassword,
            logo: logo,
            compnay_branches_num: compnay_branches_num,
            compnay_order_num: compnay_order_num,
            active: true,
            city_id: city_id,
            area_id: area_id,
            store_id: storeId.slice(0, 6),
            delivery_company_id: delivery_company_id

        });
        res.json({ message: 'Store Created Successfully', store: newStore });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getStore = async (req, res) => {
    const id = req.params.id;
    try {
        const store = await db.Users.findOne({
            where: { id }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' }
            ]
        })
        if (!store) {
            return res.status(404).json({ message: 'Store Not Found' })
        }

        res.json({ store })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}