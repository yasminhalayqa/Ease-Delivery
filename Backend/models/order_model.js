import { DataTypes } from "sequelize"

const Orders = (sequelize, Sequelize) => {
    const model = sequelize.define('order', {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        delivery_date: {
            type: DataTypes.DATE,
            // allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_type_id: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.STRING
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING
        },
        qty: {
            type: DataTypes.INTEGER
        },
        store_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salesman_id: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        store_phone: {
            type: DataTypes.STRING
        },
        salesman_phone: {
            type: DataTypes.STRING
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shipping_fees: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        invoice_id:{
            type:DataTypes.INTEGER
        }

    })
    return model
}

export default Orders