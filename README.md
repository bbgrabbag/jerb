# Jerb

**Jerb** is a simple UI for tracking your job search.

Add job listings you're interested in. Search and sort by name, date, application status, etc.

This is intended to be an open source project for coding students who want to try their hand at contributing to a smaller scale project. 

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

### Make a branch

- Once you know what you'd like to add/change, make a new branch and start coding: `git checkout -b <your-branch>`

### Contribute!

Once you've tested your code and it works, `git add -A`, `git commit -m "your commit message"`, and `git push` your branch up and submit a pull request. That's it!

---






