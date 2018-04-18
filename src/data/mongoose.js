/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import mongoose from 'mongoose';
import config from '../config';
mongoose.Promise = require('bluebird');

const mongooseConnection = () => {

    const mongoPromise = mongoose.connect('mongodb://127.0.0.1:27017',{
        server:{
            poolSize: 10
            // Поставим количество подключений в пуле
            // 10 рекомендуемое количество для моего проекта.
            // Вам возможно понадобится и то меньше...
        }
    });

    mongoose.connection.on('error',(err) =>
    {
        console.error("Database Connection Error: " + err);
        console.error('Админ сервер MongoDB Запусти!');
        process.exit(2);
    });

    mongoose.connection.on('connected',() =>
    {
        console.info("Succesfully connected to MongoDB Database");
    });

   return mongoPromise
};

export default mongooseConnection;
