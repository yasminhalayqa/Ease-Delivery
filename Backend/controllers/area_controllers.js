import db from "../models/index.js"

export const getAreas = async (req, res) => {
    try {
        const areas = await db.Areas.findAll({
            include: [
                {
                    model: db.Cities,
                    as: 'city',
                    attributes: ['city_id', 'name']
                }
            ]
        });

        if (areas.length > 0) {
            res.json({ Areas: areas });
        } else {
            res.json({ message: 'No areas found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const deleteArea = async (req, res) => {
    const { id } = req.params
    try {
        const area = await db.Areas.findByPk(id)
        if (!area) {
            return res.status(404).json({ message: 'Area Not Found' })
        }
        await area.destroy()
        res.json({ message: 'Area Deleted Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

export const updateArea = async (req, res) => {
    const { id } = req.params;
    const { name, city_id } = req.body
    try {
        const area = await db.Areas.findByPk(id)
        if (!area) {
            res.status(404).json({ message: 'Area Not Found' })
        }
        area.name = name
        area.city_id = city_id
        await area.save()
        res.json({ message: 'Area Updated Successfully', area });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const postArea = async (req, res) => {
    const { name, city_id, delivery_company_id } = req.body
    try {
        const newArea = await db.Areas.create({
            name: name,
            city_id: city_id,
            delivery_company_id: delivery_company_id
        });
        res.json({ message: 'Area Created Successfully', store: newArea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getArea = async (req, res) => {
    const area_id = req.params.id;
    try {
        const area = await db.Areas.findOne({ where: { area_id } })
        if (!area) {
            return res.status(404).json({ message: 'Area Not Found' })
        }
        res.json({ area })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}