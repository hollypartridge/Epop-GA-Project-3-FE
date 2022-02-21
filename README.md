# E-POP | GA Project 3

![E-POP](/assets/homepage.png)

## Table of Contents
* [Overview](#overview "Goto overview")
* [Deployed Version](#play-deployed-version "Goto play-deployed-version")
* [Brief](#brief "Goto brief")
* [Technologies Used](#technologies-used "Goto technologies-used")
* [Installation](#Installation "Goto Installation")
* [Process](#process "Goto process")
* [Bugs](#bugs "Goto bugs")
* [Challenges](#challenges "Goto challenges")
* [Wins](#wins "Goto wins")
* [Future Improvements](#future-improvements "Goto future-improvements")
* [Key Learning](#key-learning "Goto key-learning")

## Overview
* E-Pop is a full-stack MERN application. 
* Created as an online community and platform for creatives and developers to share their work and connect with others.
* Inspired by [**hoverstat.es.**](https://www.hoverstat.es/ "hoverstat.es.")
* Group of 4 | Timeframe: 1 week.

## Deployed Version
The deployed version can be found [**here.**](https://e-pop.netlify.app/ "here.")

## Brief
* Build a MERN full-stack application - by making your own backend and your own front-end.
* Use an Express API - to serve data from a Mongo database.
* Consume your API with a separate front-end - built with React.
* Be a complete product - which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Have a visually impressive design.
* Be deployed online so it's publicly accessible.

## Technologies used

* HTML
* SCSS
* React.js
* JavaScript (ES6)
* Axios
* React-Router-Dom
* Node.js
* MongoDB
* Express
* Mongoose
* Insomnia
* Git
* GitHub
* Netlify (deployment)

## Installation
* Access the source code via the 'Clone or download' button.
* Run `npm i` or `npm install` to install dependencies.
* Run `npm run dev` to start the development server.

## Process

### Planning
We spent the first afternoon coming up with ideas for our project. After deciding on a platform for creatives and developers to share their work and connect, we began deciding what components we would need, creating wireframes and a plan for the week. We decided we would want a home page, an archive of previous projects, user functionality to login, logout and register, the ability to favourite and comment on projects, as well as add, edit and delete your own projects.

Day 1:
* Back-end with simple functionality

Day 2:
* User functionality back-end
* Front-end components: Home, Archive, Add Project, Favourites

Day 3:
* Comment functionality back-end
* Front-end components: Login, Logout, Register
* Conditional render of navbar

Day 4:
* Error Handling
* Front-end components: Edit Project, Delete Project

Day 5 & 6 (Weekend):
* Fill the database
* CSS

Day 7:
* Checking over application
* Troubleshooting & Debug

### Work Split

We ended up using our weekly plan as a guide to work from as we split the workload between us. We decided to spend the first day working on a basic back-end together before splitting the rest of the tasks. After this I worked primarily on the front-end building the Home, Archive, Show and Favourites page, as well as working on the error handling, conditional render of the navbar and styling using SCSS.

### The Build
This project was created using VSCode while working together on Zoom. At the end of each day we would merge our branches and address any conflicts in the code together.

### Back-end
I worked on the basic back-end functionality we developed on the first day. We worked on creating a project model, RESTful controllers and a router so that we could begin working on the front-end and be able to send the API requests the project pages needed.

#### Project Schema
To create our project model we established a schema including multiple properties with different data types. 

```js
const projectSchema = new mongoose.Schema({
  website: { type: String, required: true, maxlength: 250 },
  hyperlink: { type: String, required: true, maxLength: 200 },
  credit: { type: String, required: true, maxLength: 250 },
  description: { type: String, required: true, maxLength: 400 },
  video: { type: String, required: true },
  categoryTag: [{ type: String }],
  comments: [projectCommentSchema],
  loved: { type: Boolean },
  favouritedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})
```

#### Controller
In order to link the data from our project model to a template, we created 5 controllers for our RESTful routes: `INDEX`, `SHOW`, `CREATE`, `UPDATE` and `DELETE`. Below is an example of our `INDEX` and `SHOW` controllers.

```js
async function projectsIndex (_req, res) {
  const projects = await Projects.find().populate('addedBy').populate('comments.addedBy')
  return res.status(200).json(projects)
}

async function projectShow (req, res, next) {
  const { projectId } = req.params
  try {
    const projectToFind = await Projects.findById(projectId).populate('addedBy').populate('comments.addedBy')
    if (!projectToFind) {
      throw new NotFound()
    }
    return res.status(200).json(projectToFind)
  } catch (err) {
    next(err)
  }
}
```

#### Router
After we created each controller we connected it to our router, which we set up using Express.

```js
import express from 'express'
import projects from '../controllers/projects.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/projects')
  .get(projects.index)
  .post(secureRoute, projects.create)

router.route('/projects/:projectId')
  .get(projects.show)
  .put(secureRoute, projects.edit)
  .delete(secureRoute, projects.delete)
```

#### Seeding Data
We pre-populated the back-end with data, using projects from [**hoverstat.es.**](https://www.hoverstat.es/ "hoverstat.es.") As we knew this would take a while we decided to add 5 projects at first to begin building the front-end and then add the rest on the upcoming weekend.

An example of data for a project:

```js
{
    website: 'always-hallways.de-ateliers.nl',
    hyperlink: 'https://always-hallways.de-ateliers.nl/',
    credit: 'Luuis, Étienne Ozeray, Antoine Gelgon, Werkplatts Typographie, Yara Veloso, Raoul Audouin & Mijia Wang',
    description: 'A dungeon map style navigation lets you explore the Always Hallways exhibition website for De Ateliers.',
    video: 'https://player.vimeo.com/progressive_redirect/playback/668177216/rendition/540p/540p.mp4?loc=external&oauth2_token_id=1150485861&signature=fa9a5a41d66114aead8a4bbe09ca2cde342e5eb168eb9d283b34fa4f05580c5c',
  },
```

### Front-end
I created the front-end in line with the design of [**hoverstat.es**](https://www.hoverstat.es/ "hoverstat.es"), which gave me a layout and design to take inspiration from.

#### Home Page
The homepage featured the most recently added project and a curated list of projects we loved. To do this I used an async function to get the data from the API request and then set the primary project with the first project in the array's data and the projects with all the projects' data. To display the projects we loved I worked with David on the backend to create a property `loved` with a Boolean value, changed the seeded data so that our favoruite 8 projects had a value of true and then filtered through the projects on the front-end using a conditional. 

To get the primary video to play on page load I added the `autoPlay` and `muted` attributes. To get the projects we loved videos to play when they were hovered over I used the `onMouseOver` and `onMouseOut` event listeners, the `event.target` and the `.play()` and `.pause()` video methods. I also designed the desktop design feature in SCSS and used the `primaryProject.website` key to display the website URL.

```js
<video 
  src={project.video} 
  muted 
  loop 
  width='280px'
  onMouseOver={event => event.target.play()}
  onMouseOut={event => event.target.pause()}
/>
```

![Projects We Love](/assets/projects-we-love.png)

#### Archive
The archive page had similar functionality to the home page, except it featured all the projects. To display these I, again, made an API request and then mapped through the data. On the archive page we decided to have a search functionality, which I created using the `onChange` event listener and the `e.target.value`. I then filtered through the projects returning the ones that had names matching the `e.target.value` and saving them in a `searchProducts` variable. To display the project I mapped through the `searchProducts` array in the return.

```js
const [keyword, setKeyword] = React.useState('')

const handleSearch = (e) => {
  setKeyword(e.target.value)
}

const searchProducts = projects.filter(project => {
  if (keyword === '') {
    return project
  } else if (project.website.toLowerCase().includes(keyword.toLowerCase())) {
    return project
  }
})
```

![Archive and Navbar](/assets/archive-navbar.png)

#### Conditional Render of Navbar
To conditionally render the navbar I first added extra functionality to validate tokens and helper methods in `auth.js` to check whether the user is logged in (has a token).

* `setToken` takes a token and add it to local storage.
* `getToken` retrieves a token from local storage.
* `removeToken` clears local storage of a token, essentially logging a user out.
* `getPayload` returns the payload portion of the token as an object.
* `isAuthenticated` returns true is there is a valid token in local storage and false otherwise.

```js
const tokenName = 'token'

export function setToken(token) {
  window.localStorage.setItem(tokenName, token)
}

export function removeToken() {
  window.localStorage.removeItem(tokenName)
}

export function getToken() {
  return window.localStorage.getItem(tokenName)
}

function getPayload() {
  const token = getToken()
  if (!token) {
    return false
  }
  const parts = token.split('.')
  if (parts.length < 3) {
    removeToken()
    return false
  }
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) {
    return false
  }
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}
```

Once this was done I imported my `isAuthenticated` function into the `nav.js` component. I then invoked the function, saving it in a variable `isAuth` and used a ternary operator to conditionally render the contents of the navbar.

```js
const isAuth = isAuthenticated()

{isAuth ? (
  <>
    <Link to="/favourites"><button>Favourites</button></Link>
    <Link to="/projects/create"><button>Submit</button></Link>
    <button onClick={handleLogout}>Log Out</button>
  </>
) : (
  <>
    <Link to="/register"><button>Sign up</button></Link>
    <Link to="/login"><button>Login</button></Link>
  </>
)}
```

## Bugs

**Favourites Button:**  The logic behind the conditional render of the favourites button on the show page is not right, as it doesn't check the data to see whether the project is favourited by the user and instead uses a Boolean value that is set in state.

**Comments:**  The user's name doesn't show up when they have posted a comment until the page is refreshed.

## Challenges

**Shared GitHub Repo:** It took a while to get used to working on a shared GitHub dev repo and merging conflicts with each other. Once we had done it a few times we got the hang of it and it became easier.

## Wins 

* Building a full-stack application! 
* Understanding more about the back-end and using Node.js, Express, MongoDB, Mongoose and Insomnia. 
* Loved the overall design (especially the browser feature and videos playing on hover).
* Deepened knowledge of authentication and conditional rendering.

## Future Improvements

* Debug (favourites button and comments).
* Add ability to share projects to social media.

## Key Learning

**More React!:** I learned a lot more about React's functionalities and got more comfortable with it during this project. I started to use conditional rendering a lot more and felt comfortable implementing a search function and playing around with event listeners.

**Back-end:** Creating our application helped me develop my skills on the back-end. It was the first time I had made a full-stack application and my first time using Node.js, Express, MongoDB and Mongoose. Working together to create a basic back-end enabled me to gain a greater understanding by asking questions to my team members who were more comfortable developing the back-end.

**Working as a team using shared repo:** This was the first time I had used a shared repo and it was great to learn how to do this as it was really helpful when there were a group of us all working on different components.
