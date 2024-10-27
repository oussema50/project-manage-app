const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:5001'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];



swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./index.js'); 
  });