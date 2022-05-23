const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const consign = require('consign');
const cors = require('cors');

//VARIÁVEIS DA APLICAÇÃO
app.set('port', process.env.PORT || config.get('server.port'));

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//SWAGGER
var swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GOMI API",
            version: "1.0.0",
            description: "A API que vai nos garantir um 10 em LPIV"
        },
        servers: [{
            url: "http://localhost:8080"
        }]

    },
    apis: ["./01 - Presentation/api/routes/*.js"]
};

var specs = swaggerJsdoc(swaggerOptions);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));

//ENDPOINTS
consign({ cwd: path.join('./01 - Presentation', 'api') })
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app