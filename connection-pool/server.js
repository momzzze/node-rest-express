const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDB } = require('./db/db.js');

const routes = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('./docs/swaggerOptions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use('/api/v1', routes);

// Call connectToDB
connectToDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
