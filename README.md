# GENERAL NOTES

This repo serves as a a React competencies test.

# DEVELOPER NOTES

Since it was required not to use 3rd party packages for state management, there was an option to use useReducer or useState and perform a prop drilling thoughout component, but as an alternative, React context was used instead

'create-react-app' was used as a bootstraping tool, and besides default packages, only 3 were additionaly installed:
'sass' for styling purposes
'prop-types' for typechecking (since it is not included anymore) and
'react-router-dom' for routing (since there were no particular requirements there)

Styling and color choice was influenced by Q Agency website, Rubik font tags injected inside index.html file

All rendered components have console.log('${propsmessage} ${componentName}') requirement implemented, besides 'Loader' component (because it is being rednered briefly only occasionaly) and 'nameExtractorHoc' which is actually not rendered but serves as a high order component to extract child component name and inject it as '${componentName}'. For same reason, child components could not be memoized and rerender required console.log more then expected, because memoization would prevent '${componentName}' injection.

Filtering note: Request stated that post filtering should use user data for filtering purposes. Since this request was slightly opet for discussion, rafined userdata object has been used (including name, email, website,company.name and address.city). Comparation on filtering results can be verified by clicking on individual post component in the bottom part under "About the author:"

Due to a lack of practical experience, no unit test have been performed

## Test overview

Create a React application that shows a list of Posts and associated post Comments that are fetched via provided API.
Push the code to github + describe the build/run process in a Readme file
Write approximate time needed to finish the assignment

## Feataures

Create 2 routes: '/posts' & 'post/{id}'.
Posts route should show a list of posts and associated comments. Every post should have a user's name associated.
Create a search input and filter posts by user data using an input field.
Clicking a post will open it in a new page
MUST! EVERY component one rendered must log in the console 'Hello from <insert component name>'. The part 'Hello from' must be sent to a component via props and defined only once within the scope of the application. So it looks something like console.log('${propsmessage} ${componentName}'). Feel free to name the variable names as you see fit.

## Conditions

The UI is up to you. This is a React oriented test but at least a minimally usable layout that does not break and is appealing to the eze is required.
Do not use any 3rd party state management solution. Again this is a React oriented test. That does not mean state management can't be handled in a well structured way.
Do not use any 3rd party UI component libraries. The UI of the app can be very minimal and does not require 3rd party component libraries. CSS libraries are allowed (e.g. Bootstrap)
When writing components try to find a way to make them reusable and resilient, meaning they can easily be integrated into other applications. The part of the test is very important.
Try to use some of the more advanced concepts like HOC, Render props, Compound components etc.
You are free to use any React bootstrapping tool, create-react-app is recommended
It is also highly recommended to use TypeScript. If not, make sure to use Typechecking With PropTypes
You are free to structure the code in any way you like (folder structure) but try to make it as real-world as possible
You are free to include any tools that you use in general that can help you work on this task like linters, code style checkers, UI component testers etc.
Unit tests are not mandatory but highly recommended

## API

use JSONPlaceholder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
