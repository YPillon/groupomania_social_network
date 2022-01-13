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

//Go to the "/backend" repository and run the server with the following command:
```
nodemon server

OR

node server
```

//The admin user is automatically created on launch in the /models/User.js file
//with following credentials:
// email: admin@admin.com
// password: 1234


You are good to go ;)