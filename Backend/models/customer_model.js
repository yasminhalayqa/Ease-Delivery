import { DataTypes } from "sequelize"

const Customers = (sequelize, Sequelize) => {
    const model = sequelize.define('customer', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        area_id:{
            type: DataTypes.INTEGER,
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return model
}

export default Customers