import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';
import Users from './user_model.js';
import Roles from './role_model.js';
import Orders from './order_model.js';
import OrderDetails from './order_details_model.js';
import Cities from './city_model.js';
import OrderTypes from './order_types_model.js';
import Customers from './customer_model.js';
import Areas from './area_model.js';
import OrderStatusTracking from './order_status_tracking.js';
import Tickets from './tickets.js';

// Creating a new Sequelize instance with the provided configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: "mysql"
});

// Creating an object to hold database models
const db = {};

// Setting Sequelize and sequelize on the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//tables
db.Users = Users(sequelize, Sequelize)
db.Roles = Roles(sequelize, Sequelize)
db.Orders = Orders(sequelize, Sequelize)
db.OrderDetails = OrderDetails(sequelize, Sequelize)
db.Cities = Cities(sequelize, Sequelize)
db.OrderTypes = OrderTypes(sequelize, Sequelize)
db.Customers = Customers(sequelize, Sequelize)
db.Areas = Areas(sequelize, Sequelize)
db.OrderStatusTracking = OrderStatusTracking(sequelize, Sequelize)
db.Tickets = Tickets(sequelize, Sequelize)


//relations
db.Users.belongsTo(db.Roles, { foreignKey: 'role_id' });
db.Orders.belongsTo(db.Orders, { foreignKey: 'invoice_id' });
db.Areas.belongsTo(db.Cities, { foreignKey: 'city_id' });
db.Customers.belongsTo(db.Cities, { foreignKey: 'city_id' });
db.Customers.belongsTo(db.Areas, { foreignKey: 'area_id' });
db.Orders.belongsTo(db.OrderTypes, { foreignKey: 'order_type_id' });
// db.Users.belongsTo(db.OrderTypes, { foreignKey: 'city_id' });
// db.Users.belongsTo(db.OrderTypes, { foreignKey: 'area_id' });
db.Orders.belongsTo(db.Customers, { foreignKey: 'customer_id' });
db.Users.belongsTo(db.Cities, { foreignKey: 'city_id' })
db.Users.belongsTo(db.Areas, { foreignKey: 'area_id' })

db.OrderDetails.belongsTo(db.Orders, { foreignKey: 'order_id' })
db.Orders.belongsTo(db.OrderDetails, { foreignKey: 'invoice_id' });

db.OrderStatusTracking.belongsTo(db.Orders, { foreignKey: 'order_id' })



export default db;
