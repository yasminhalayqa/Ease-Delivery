import db from "../models/index.js"

export const getCitis = async (req, res) => {
    try {
        const city = await db.Cities.findAll()
        if (city.length > 0) {
            res.json({ cities: city })
        } else {
            res.json({ message: 'no city found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteCity = async (req, res) => {
    const { id } = req.params
    try {
        const city = await db.Cities.findByPk(id)
        if (!city) {
            return res.status(404).json({ message: 'City Not Found' })
        }
        await city.destroy()
        res.json({ message: 'City Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateCity = async (req, res) => {
    const { id } = req.params;
    const { name, shipping_fees } = req.body
    try {
        const city = await db.Cities.findByPk(id)
        if (!city) {
            res.status(404).json({ message: 'City Not Found' })
        }
        city.name = name
        city.shipping_fees = shipping_fees
        await city.save()
        res.json({ message: 'City Updated Successfully', city });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postCity = async (req, res) => {
    const { name, shipping_fees, delivery_company_id } = req.body
    try {
        const newCity = await db.Cities.create({
            name: name,
            shipping_fees: shipping_fees,
            delivery_company_id: delivery_company_id

        });
        res.json({ message: 'City Created Successfully', city: newCity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCity = async (req, res) => {
    const city_id = req.params.id;
    try {
        const city = await db.Cities.findOne({ where: { city_id } })
        if (!city) {
            return res.status(404).json({ message: 'City Not Found' })
        }
        res.json({ city })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}