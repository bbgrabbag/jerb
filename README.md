# [Jerb]( http://www.jerb.life/)
#### Sponsored by [VSchool](http://vschool.io/)
###### Admin  [Ben Turner](http://btdev.surge.sh)

## Purpose
One of the best ways to prove your mettle as a dev is to contribute to open source projects. However, it can be daunting as a new bootcamp/cs grad to know where to start. Jerb is intended to be an approachable, small scale project that requires only a foundational understanding of the MERN stack to make meaningful contributions.

## The App
Jerb is a very basic CRUD app that allows users to track his/her job searches.

#### Technologies
- React/Redux
- Mongoose
- Express

---

## How to contribute

### Set up:
- Fork repository
- Clone onto your local machine `git clone <your-forked-repo-url>`
- Install server and client dependencies `npm install && cd client && npm install`
- Create a `.env` file in root folder with the following properties:
  - `SECRET` --> string of 6-10 random words
  - `PORT` --> your local server port
  - `MONGODB_URI` --> url to the database server (Try `mongodb://localhost:27017/jerb`).

### Run development server

- From root, `npm run dev`
- From `/client`, `npm run start`

### Decide what you'd like to improve
- Check the issues tab for the most recent bugs/issues
- Test the app as a user to find potential UX/UI improvements
- Run performance tests to see where efficiency could be improved
- Add a new feature

### Make a branch
- Use the following naming conventions when branching: 
  - prefix with `/feature` for new features
  - prefix with `/bugfix` for bug fixes
  - reference the issue ID in the branch name when fixing issues.
- Once you know what you'd like to add/change, make a new branch and start coding: `git checkout -b <your-branch>`

### Contribute!

Once you've tested your code and it works, `git add -A`, `git commit -m "your commit message"`, and `git push` your branch up and submit a pull request. That's it!

---






