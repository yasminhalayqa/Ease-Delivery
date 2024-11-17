import { DataTypes } from "sequelize"

const OrderDetails = (sequelize, Sequelize) => {
    const model = sequelize.define('order_details', {
        invoice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        collection_receipt_status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        receipt_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        order_id: {
            type: DataTypes.INTEGER,
        },
    })
    return model
}

export default OrderDetails