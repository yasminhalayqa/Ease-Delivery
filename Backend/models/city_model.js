import { DataTypes } from "sequelize"

const Cities = (sequelize, Sequelize) => {
    const model = sequelize.define('city', {
        city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_fees: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return model
}

export default Cities