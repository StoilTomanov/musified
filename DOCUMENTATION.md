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

2. Install all dependancies required for the REST server to work again using `npm install` in the command panel. Note: REST server is in a separate folder which means you will first need to naviagte to this folder - `musified_rest_api`

3. Ensure you are using your correct MongoDb connection string. You can check `index.js` file for that.

4. While you are in the REST server folder run `npm run start` in the command panel. This will start the server on port 4000

5. Navigate to the Musified application folder and run `ng serve`. Once done the app should be running properly on `http://localhost:4200`

## About project

- Musified is educational online platform that allows users to enroll for any course uploaded in the platform. Courses are music related and are all for free 🙂
- Once you created an account you will be able to explore and enroll for a new course. From there you will find all your courses in the `My Courses` section from where you can play them, rate them, take a quiz and more. Once course is considered completed once the video materials have been played as well the quiz is taken with at least 80% correct answers. In case your score is lower you can re-watch or re-take the quiz as many time you need. Enjoy and let the music be with you!

## Project architecture

#### Note: The first and only first created account will always be an `Admin` account. In a production environment the admin account will be preset

#### Note: For the first record you create please use this resourse link: `../../../../assets/basic_chords.mp4`. The resourses will be uploaded / retrived from cloud storage API soon


#### Public part
- Visible pages will be `Home`, `Mission`, `Explore`, `Contacts`

#### Private part
- Visible pages will be `Courses` - if `Admin`, `New course` - if `Admin` account, `Explore`, `My Lessons`, `Profile`, `Contacts`

- Admin account will have the functionality to create and edit courses

### Modules and components

#### App module
 * App

#### Auth module
 * Login
 * Registration

#### Core module
 * Header
 * Footer
 * Logout

#### Shared module
- Home
- Mission
- Contacts
- Course details
- Lessons
- Profile

### Services

- User service
- Lessons service

### Interceptors

- Auth interceptor
- Token interceptor

### Guards

- Auth guard

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
- Implementing profile data update
- Implementing admin functionality

#### What's left TODO: (11.04.2022)
- Learn more button in home page - Done
- Handle contact form
- Edit course ( Admin only ) - Done
- Profile/courses view - Done
- Profile details update - Done
- Details and Give up buttons in My Lessons component - Done
- Back, quiz, give up and Report an issue buttons in watch-lesson component - Done
- Rate and Report an issue buttons in course details component - Done

- Deploy the application
- Cloud storage API implementation
- Angular animations - Done
- State management
- Unit tests
- Research the geolocation API and see if can be useful for this app