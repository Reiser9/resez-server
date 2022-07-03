import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';

import { register, login, getMe } from './controllers/UserController.js';
import validationErrors from './utils/validationErrors.js';

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/auth/me', checkAuth, getMe);
app.post('/auth/login', loginValidation, validationErrors, login);
app.post('/auth/register', registerValidation, validationErrors, register);

app.listen(process.env.PORT || 4444, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server OK');
});