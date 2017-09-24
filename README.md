# StreetSafe
[Live Website](http://ec2-52-38-17-98.us-west-2.compute.amazonaws.com:3000/)

## Frontend Design
### Setting up the frontend development environment

## Backend Design
### Setting up the backend development environment on your local machine
* Install mongoDB on your machine
* Start the mongoDB process on your machine by running
```bash
mongod --dbpath <path to data directory>
```
* Install node.js on your machine
* CD into the StreetSafe direction
* Run `npm install` to install the dependencies required by the project
* Run the node js server with the command
 `node server.js` or `nodejs server.js`

 ### Setting up the environment on the Amazon AWS instance
 * `git clone` the directory to a virtual machine
 * Open port 3000 to incoming TCP connections in the firewall settings
 * Install node.js and mongodb on the virtual machine
 * Use the commands above to run the mongoDB process and node.js process

 #### How to load a csv in to mongoDB from StreetSafe directory:
 ```mongoimport -d streetsafedb -c street_safe_data --type csv --file data/street_safe_test_data.csv --headerline```
