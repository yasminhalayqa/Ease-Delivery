import { DataTypes } from "sequelize"

const Tickets = (sequelize, Sequelize) => {
    const model = sequelize.define('ticket', {
        ticket_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    })
    return model
}

export default Tickets