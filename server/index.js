import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import postRoutes from './routers/posts.js';
import habitRoutes from './routers/habits.js';
import authRoutes from './routers/auth.js';
import userRoutes from './routers/user.js';
import adminRoutes from './routers/admin.js';
import logRoutes from './routers/log.js';
import exploreRoutes from './routers/explore.js';
import feedRoutes from './routers/feed.js';

import { userAuth, adminAuth } from './middleware/auth.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/admin', adminAuth, adminRoutes);
app.use('/p', postRoutes);
app.use('/h', habitRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/log', logRoutes);
app.use('/explore', exploreRoutes);
app.use('/feed', feedRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Happits API");
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)).on('error', function(err) {console.log(error) }))
    .catch((error) => console.log(error.message));

