# Storefront Backend Project

This project is part of udacity full stack javascript developer scolarship ,
its aim to build restful api with postgres and express


## Install
### Available Scripts

*  `npm run build` compiles all .ts files to .js in the build folder.

*  `npm install` installs all required modules.

*  `npm run start` compiles .ts files and runs index.js in the build folder to start the server.

*  `npm run lint` runs ESLint.

*  `npm run prettier` runs prettier.

*  `npm run test` runs jasmine tests.

### Running the API

#### 1. Install all packages 

 1. `npm install `


#### 2. Using the postgreSQL :

1.  `npm install` to install all packages

2. Using the postgreSQL command line with host `localhost` and port `5432`:

1.  `CREATE DATABASE proj;`

2.  `CREATE DATABASE proj_test;`

3.  `CREATE USER proj_user WITH PASSWORD '12345';`

4.  `GRANT ALL PRIVILEGES ON DATABASE proj TO proj_user;`

5.  `GRANT ALL PRIVILEGES ON DATABASE proj_test TO proj_user;`

3.  `db-migrate up` to run all migrations

4.  `npm start` to start the API

#### OR Using the postgreSQL pgAdmin :



####  3. Create Environment Variables

PORT=`4000`\
POSTGRES_HOST=`localhost`\
POSTGRES_NAME=`proj`\
POSTGRES_USER=`proj_user`\
POSTGRES_PORT=`5432`\
POSTGRES_PASSWORD=`12345`\
POSTGRES_DB_TEST=`proj_test`\
ENV=`dev`\
BCRYPT_PASSWORD=`your-secret-password`\
SALT_ROUND=`10`\
TOKEN_SECRET=`your-secret-password`\
