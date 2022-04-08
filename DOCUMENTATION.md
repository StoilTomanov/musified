# Musified

| Contents
|---
| [Instalation](#Instalation)
| [About project](#About-Project)
| [Project architecture](#Project-architecture)
| - [Modules and components](#Modules-and-components)
| - [Services](#Services)
| - [Interceptors](#Interceptors)
| - [Tests](#Tests)
| - [Technologies used](#Technologies-used)
| - [Point of improvement](#Point-of-improvement)


## Getting started

### Instalation

1. Install all dependancies required for the application to work using `npm install` in the command panel

2. Install all dependancies required for the REST server to work again using `npm install` in the command panel. Note: REST server is in a separate folder which means you will first need to naviagte to this folder

3. Ensure you are using your correct MongoDb connection string. You can check `index.js` file for that.

4. While you are in the REST server folder run `npm run start` in the command panel. This will start the server on port 4000

5. Navigate to the Musified application folder and run `ng serve`. Once done the app should be running properly on `http://localhost:4200`

## About project

- Musified is educational online platform that allows users to enroll for any course uploaded in the platform. Courses are music related and are all for free 🙂

## Project architecture

### Modules and components

- App module
 * App

- Auth module
 * Login
 * Registration
 * Logout

- Core module
 * Header
 * Footer

- Shared module
 * Home
 * Mission
 * Contacts
 * Course details
 * Lessons
 * Profile

### Services

- Two main services
 * User service
 * Lessons service

### Interceptors
- Auth interceptor
- Token interceptor

### Tests
- Currently no test have been written

### Technologies used
- This is a pure Angular project meaning no extra dependancies are used at this moment

### Point of improvement
- Improving data storage
- Implementing media storage
- Implementing media upload / delete
- Implementing subscription / unsubscription of courses
- Implementing admin views
