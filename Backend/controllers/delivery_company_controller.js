import { Op } from "sequelize"
import db from "../models/index.js"
import bcrypt from 'bcryptjs'

export const getDeliveryCompanies = async (req, res) => {
    try {
        const delivery_company = await db.Users.findAll({
            where: { role_id: 2 }, include: [
                { model: db.Cities, as: 'city' },
                { model: db.Areas, as: 'area' }
            ]
        })
        if (delivery_company.length > 0) {
            res.json({ delivery_company: delivery_company })
        } else {
            res.json({ message: 'no delivery company found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteDeliveryCompany = async (req, res) => {
    const { id } = req.params
    try {
        const deliveryCompany = await db.Users.findByPk(id)
        if (!deliveryCompany) {
            return res.status(404).json({ message: 'Delivery Compnany Not Found' })
        }
        await deliveryCompany.destroy()
        res.json({ message: 'Delivery Company Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateDeliveryCompany = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone_number, email, password, logo, compnay_branches_num, compnay_order_num, active, city_id, area_id } = req.body
    try {
        const deliveryCompany = await db.Users.findByPk(id)
        if (!deliveryCompany) {
            res.status(404).json({ message: 'Delivery Compnany Not Found' })
        }
        deliveryCompany.name = name
        deliveryCompany.address = address
        deliveryCompany.phone_number = phone_number
        deliveryCompany.email = email
        deliveryCompany.password = password
        // deliveryCompany.logo = logo
        deliveryCompany.compnay_branches_num = compnay_branches_num
        deliveryCompany.compnay_order_num = compnay_order_num
        deliveryCompany.active = active
        deliveryCompany.city_id = city_id
        deliveryCompany.area_id = area_id

        await deliveryCompany.save()
        res.json({ message: 'Delivery Company Updated Successfully', deliveryCompany });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateDelivertCompanyActive = async (req, res) => {
    const { id } = req.params
    const { active } = req.body
    try {
        const deliveryCompany = await db.Users.findByPk(id)
        if (!deliveryCompany) {
            res.status(404).json({ message: 'Delivery Compnany Not Found' })
        }
        deliveryCompany.active = active
        await deliveryCompany.save()
        res.json({ message: 'Delivery Company Updated Successfully', deliveryCompany });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postDeliveryCompany = async (req, res) => {
    const { name, address, phone_number, email, password, logo, compnay_branches_num, compnay_order_num, active, city_id, area_id } = req.body
    try {
        const existingDeiveryCompany = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { phone_number: phone_number },
                    { name: name },
                    { email: email }

                ]
            }
        })
        if (existingDeiveryCompany) {
            return res.status(400).json({ message: 'Phone number, email, or name already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newDeliveryCompany = await db.Users.create({
            name: name,
            address: address,
            phone_number: phone_number,
            email: email,
            role_id: 2,
            password: hashedPassword,
            logo: logo,
            compnay_branches_num: compnay_branches_num,
            compnay_order_num: compnay_order_num,
            active: active,
            city_id: city_id,
            area_id: area_id,

        });
        res.json({ message: 'Delivery Company Created Successfully', deliveryCompany: newDeliveryCompany });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDeliveryCompany = async (req, res) => {
    const id = req.params.id;
    try {
        const deliveryCompany = await db.Users.findOne({ where: { id } })
        if (!deliveryCompany) {
            return res.status(404).json({ message: 'Delivery Compnany Not Found' })
        }

        res.json({ deliveryCompany })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}