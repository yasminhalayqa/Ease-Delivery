import { DataTypes } from "sequelize"

const Users = (sequelize, Sequelize) => {
    const model = sequelize.define('user', {
        id: {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },
        compnay_branches_num: {
            type: DataTypes.INTEGER
        },
        compnay_order_num: {
            type: DataTypes.INTEGER
        },
        logo: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        city_id: {
            type: DataTypes.INTEGER
        },
        area_id: {
            type: DataTypes.INTEGER
        },
        store_id: {
            type: DataTypes.STRING
        },
        salesman_id: {
            type: DataTypes.STRING
        },
        delivery_company_id: {
            type: DataTypes.INTEGER
        }
    })
    return model
}

export default Users