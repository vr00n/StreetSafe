# StreetSafe
[Live Website](http://ec2-52-38-17-98.us-west-2.compute.amazonaws.com:3000/)

## Frontend Setup Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

### Development server

CD into Public/StreetSafeNG from the root of the respository.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Serving Angular on the node backend

Move the dist folder inside the StreetSafeNG folder up one level in the repository to be a direct descendent of the public folder. Node will serve this folder and Angular will take over.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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
