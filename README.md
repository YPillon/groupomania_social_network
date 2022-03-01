Hi! This project is an enterprise social network where users can create posts, like and comment them.
Posts can be deleted, and there is a special admin user as well (more details further ;))

Feel free to clone it on your machine to run the app !



## Frontend setup

```
npm install
```

// Compiles and hot-reloads for development

```
npm run serve
```

// Compiles and minifies for production

```
npm run build
```

// Lints and fixes files

```
npm run lint
```

// Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



## Backend setup

//Install mysql on your computer if not installed

```
sudo apt install mysql-server
```

//Create the Groupomania database

```
CREATE DATABASE groupomania
```

//Create the groupomania_user with password 12345678

```
CREATE USER 'groupomania_user'@'localhost' IDENTIFIED BY '12345678';
```

//Connect as root and grant all privileges to groupomania_user on groupomania DB

```
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania_user'@'localhost';

FLUSH PRIVILEGES;
```

//Go to the "/backend" repository and install npm packages:

```
npm install
```

//In the same "/backend" repository, run the server with the following command:

```
nodemon server

OR

node server
```

//All tables are created automatically on launch by Sequelize

//If you want to use another database/user/password, you can change it in the /backend/.env file.

//The admin user is automatically created on launch in the /models/User.js file
//with following credentials:
// email: admin@admin.com
// password: 1234



You are good to go, have fun! ;)
