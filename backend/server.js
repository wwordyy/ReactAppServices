const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');



const authRoutes = require('./routers/authRoters');
const serviceRouter = require('./routers/serviceRouters')
const userRouter = require('./routers/userRouters')
const orderServiceRouter = require('./routers/orderServiceRouters')
const orderRouter = require('./routers/orderRouters')
const categoryRouter = require('./routers/categoryRouters')
const userOrderDataRouter = require('./routers/userOrderDataRouters')
const reviewRouter = require('./routers/reviewRouters');
const statusRouter = require('./routers/statusRouters');



dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());



app.use('/api', authRoutes);
app.use('/api', serviceRouter);
app.use('/api', userRouter);
app.use('/api', orderServiceRouter);
app.use('/api', orderRouter);
app.use('/api', categoryRouter);
app.use('/api', userOrderDataRouter);
app.use('/api', reviewRouter)
app.use('/api', statusRouter);





app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
