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
   5. add main layout in views layouts folder with file name main.hbs
   6. add partials folder in views folder.
6. Connect with the db
   1. install mongoose
7.   