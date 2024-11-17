import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index.js';
import cors from "cors";
import userRouter from './routes/delivery_compnay_route.js';
import orderRouter from './routes/order_route.js';
import storeRouter from './routes/store_route.js';
import salesManRouter from './routes/salesman_route.js';
import AuthRouter from './routes/auth_route.js';
import cityRouter from './routes/city_route.js';
import areaRouter from './routes/area_route.js';
import customerRouter from './routes/customer_route.js';
import orderTypeRouter from './routes/order_type_route.js';
import ticketRouter from './routes/ticket_route.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/users", storeRouter);
app.use("/users", salesManRouter);
app.use("/auth", AuthRouter);
app.use("/cities", cityRouter);
app.use("/areas", areaRouter);
app.use("/customers", customerRouter);
app.use("/order_types", orderTypeRouter);
app.use("/tickets", ticketRouter);




db.sequelize.sync({ force: false })
    .then(() => {
        console.log("[database]: Drop and re-sync db.");
    })
    .catch((err) => {
        console.error(`[error]: ${err}`);
    });

app.listen(PORT, () => {
    console.log(`[server]: Listening on port ${PORT}`);
});
