const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WoW Auth API',
      version: '1.0.0',
      description: 'Authentication endpoints for WoW users',
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../controllers/**/*.js'),
  ],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
