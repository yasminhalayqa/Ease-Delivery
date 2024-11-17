import { DataTypes } from "sequelize"

const OrderTypes = (sequelize, Sequelize) => {
    const model = sequelize.define('order_type', {
        order_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
    return model
}

export default OrderTypes