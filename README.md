# node-mongo-crud-authjwt-api
**** Work In Progress ****

All in One Simple NodeJS, MongoDB, Auth CRUD JWt Auth API.
Inspired by https://github.com/Luracast/Restler

Features : 

* Automatic API Endpoint generation based on controller names and function names
* All Models available in any controller in single Object
* All in One Powerful CRUD - No Need to define controller for basic crud operation per model - Auto Population

# How to Setup
1. Download ZIP or CLONE it
2. npm install
3. copy .env-copy to .env
4. update MongoDB Server URl (Get Free at Mongodb Cloud)
5. run node index.js
6. add new model/collection and CRUD available automatically
   GET : localhost:3000/crud/olist/[modelname] 
   POST :  localhost:3000/crud/addedit/[modelname]     
7. add Header 'authtoken' for secured endpoints   
# How APIs can be Created - Function Names
start with 'get' or 'post' for GET or POST Specification

# Secure OR NonSecure Endpoints
By Default All API Endpoints are Secured by JWT Auth Token
include secure OR unsecure in function names to bypass this
Repeated Function names can may cause issues

# AllInOne CRUD
Single CRUD controller for all application collection crud operations which supports
Search, Pagination

# CRON
Cron JOBS can be manages from /app/other.cron.js
node-cron Package Used for this.

# SAAS Ready
All data is isolated with organization ID - Built in Data Isolation SAAS Ready