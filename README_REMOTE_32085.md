##JERB

**Jerb** is a simple UI for tracking your job search.

Add job listings your interested in. Search and sort by name, date, application status, etc.

This is intended to be an open source project for coding students who want to try their hand at contributing to a smaller scale project. 

#####Get Started:
- `git clone https://github.com/bbgrabbag/jerb.git`
- `vi .env`
```
//Add this code to the env file -->

MONGODB_URI="mongodb://<your-mongo-uri>"
SECRET="<put your secret here>"
```
- `npm install`
- `cd client && npm install`
- `npm run start` starts the ReactJS development server
- if you don't already have nodemon: `npm install -g nodemon`
- from main folder: `nodemon index.js` starts the expressJS server
- You're ready to start contributing!!










