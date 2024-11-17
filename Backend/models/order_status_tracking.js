import { DataTypes } from "sequelize"

const OrderStatusTracking = (sequelize, Sequelize) => {
    const model = sequelize.define('status_tracking', {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE
        },
        order_id: {
            type: DataTypes.INTEGER
        }
    })
    return model
}

export default OrderStatusTracking