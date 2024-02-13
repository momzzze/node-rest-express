# Express App Cheat-Sheet
1. Init a new project
2. Install nodemon with -D
3. Install & config express
   1. Install express
   2. start express initial server
   3. Add static middleware
   4. Add static files images and css in public folder **app.use(express.static('public'));**
   5. add body parser middleware **app.use(express.urlencoded({ extended: true }));**
4. make routes.js inside modular route const router module exports router  
5. install handlebars
   1. Install express-handlebars
   2. config handlebars with express
 
![Screenshot](pics/Screenshot%202024-02-09%20165523.png)

   3. Add views folder with resources.
   
![Screenshot](pics/Screenshot%202024-02-09%20170116.png)
   
   4. Add home page
      1. add home view
      2. add home controller 
      3. add homeController to routes
   5. add main layout in views layouts folder with file name main.hbs
   6. add partials folder in views folder.
1. Connect with the db
   1. install mongoose
   2. Setup db connection
   3. Add user model
2. Authentication
   1. Fix navigation links main layout
   2. Add register page
      1. controller + view
      2. fix register form 
      3. add post register action (auth controller)
      4. add auth service
      5. instal bcrypt jsonwebtoken
      6. hash password
      7. check confirm password       
   3. Add login page (authentication)
      1. controller + view
      2. fix login form
      3. add post login action (auth controller)
         1. get user from db
         2. check password
         3. create token
         4. generate token
         5. install cookie-parser
         6. add cookie parser middleware
      4. return cookie with token
      5. Modify register for auto login
      6. logout
         1. add logout action
         2. remove cookie
      7. authorization middleware
         1. add authMiddleware
         2. check token if guest
         3. verify token
         4. use middleware
         5. add isAuth to views
      8. Error Handling
         1. Add notifications
         2. Add error utils getErrorMessage
         3. Add register error handling
         4. Add login error handling
      9.  Last fixes
         1. Dynamic Navigation
         2. 