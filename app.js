'use strict';

const express = require('express')
const app = express(),
    bodyParser= require('body-parser');

app.use(bodyParser.json());

// CRUD = C (post), R (get), U (put), D (delete)

app.get('/ping',
    (req, res) => {
    res.status(200).send('pong');
});

app.use('/', require('./routes'));
// _useErrorMiddlewares();

app.listen(process.env.PORT || 4000,  () =>{
    console.log('app is running')
});
//
// function _useErrorMiddlewares() {
//     app.use((err, req, res, next) => {
//         // request aborted handler
//         if (err.status === 400 && err.code === 'ECONNABORTED') {
//             return res.status(err.status).json({
//                 error: err
//             });
//         }
//
//         if (err.name !== 'JsonSchemaValidation') {
//             return next(err);
//         }
//
//         res.status(400).json({
//             statusText: 'Bad Request',
//             jsonSchemaValidation: true,
//             errors: err.validations  // All the validation information
//         });
//     });
// }