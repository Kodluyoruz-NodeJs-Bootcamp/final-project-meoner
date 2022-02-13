import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import userRouter from './routes/users';

// import playerRouter from './routes/players';
// import employeeRouter from './routes/employees';
// import categoriesRouter from "./routes/categories"
// import productsRouter from "./routes/product"
//import './services/passport';

import * as dotenv from 'dotenv';

dotenv.config();

createConnection().then((connection) => {
    const app: Application = express();
    app.use(bodyParser.json());
// Add headers
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        // @ts-ignore
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.use('/users', userRouter);
    // app.use('/players', playerRouter);
    // app.use('/employees', employeeRouter)
    // app.use('/categories', categoriesRouter)
    // app.use('/products', productsRouter)

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
    });
});
