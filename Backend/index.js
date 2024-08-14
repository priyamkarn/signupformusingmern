// backend/index.js
const express = require('express');
const rootRouter = require("./routes/index");

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true 
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000);