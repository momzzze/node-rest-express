# node-rest-express
  Creating some small projects to practice RESTful api principles.


Project 1: RESTful Auth Api:
  - Using Express, Mongoose,MongoDB, redis, and JWT to create a RESTful api that allows users to sign up, login, and logout.
  - Using REST Client ext to test the api.  
  - Location: api-exercise/express-js-auth-apis
  
  Running the Application
    Start the server:
    redis-commander (you need to have redis installed used to generate  refresh tokens)
    npm start

  Testing the API:
    Use a REST Client extension to interact with the API. Here are the available endpoints:

    GET http://localhost:3006/ - Requires an Authorization header with a Bearer token for authentication.
    POST http://localhost:3006/auth/register - Requires Content-Type: application/json in the request body with username and password. Returns an authentication token.
    POST http://localhost:3006/auth/login - Requires Content-Type: application/json in the request body with username and password. Returns an authentication token.
    POST http://localhost:3006/auth/refresh-token - Requires Content-Type: application/json in the request body with refreshToken. Returns a new authentication token.
    DELETE http://localhost:3006/auth/logout - Requires Content-Type: application/json in the request body with refreshToken. Helps to invalidate the refresh token.
    Additional Notes:
    To use the /auth/logout endpoint effectively, send a Content-Type: application/json header along with the refreshToken in the request body. This helps improve security by invalidating the refresh token.