import { DataTypes } from "sequelize"

const Roles = (sequelize, Sequelize) => {
    const model = sequelize.define('role', {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },

    })
    return model
}
export default Roles