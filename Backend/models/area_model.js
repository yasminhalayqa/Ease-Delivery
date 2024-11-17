import { DataTypes } from "sequelize";

const Areas = (sequelize, Sequelize) => {
    const Area = sequelize.define('area', {
        area_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivery_company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

    return Area;
};

export default Areas;
