import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes/index.js';

const connectDB = async () => {
    try {
        console.log('connecting to DB...');
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('DB connected successfully!');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1);
    }
};

const app = express();

app.use(express.json(), (err, req, res, next) => {
    if (err) {
        console.error('Error parsing JSON body: ', err);
        res.status(400).json({ message: 'Invalid JSON data' });
    } else {
        next();
    }
});
app.use(express.urlencoded({ extended: true }), (err, req, res, next) => {
    if (err) {
        console.error('Error parsing x-www-form body: ', err);
        res.status(400).json({ message: 'Invalid x-www-form data' });
    } else {
        next();
    }
});
app.use(morgan('dev'));
app.use('/api', router);

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 9090;
        app.listen(PORT, () => {
            console.log(`server started at localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('server startup error:', err);
    });
