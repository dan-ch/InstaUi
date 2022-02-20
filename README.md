# InstakilogramUi

![profile page](https://res.cloudinary.com/dsgz1rsiu/image/upload/v1645311803/Github%20docs/insta2_tiepkj.png)

## Description

InstakilogramUi is a frontend application(UI)/a part of Instakilogram app which is a photo sharing application, just like the well-known Instagram, that contains core functionalities of this type of software(more in section below). InstakilogramUi app provides a way to display received data and manipulate data using forms and other types of UI elements. This application is using Laravel API, which is on my GitHub at this link: <https://github.com/dan-ch/InstakilogramApi>.

While working on this project, I learned primarily:

- how to store and manage application state using Redux
- how to connect React.js app with secured API using Bearer token and Local Storage(with react-persist library)
- how to facilitate work with Promises and queries with redux-thunk middleware

## Features

- Storing application state using Redux and Local Storage(with react-persist library)
- Sending requests with redux-thunk and axios
- CRUD operation on posts
- Adding and deleting post comments
- Like system
- Searching for users and posts
- Following other users
- "Wall" based on followed users posts
- Post pagination on "wall" and user profile
- User registration
- Sign in with Google and Github
- Authentication using Bearer token
- Data validation before sending request
- "Drag and drop" photo adding
- Image compression

## Built with

- TypeScript 4.5.2
- [React.js](https://pl.reactjs.org/) 17.0.2
- [Redux](https://redux.js.org/)
- [Redux-thunk](https://www.npmjs.com/package/redux-thunk) 4.1.2
- [Redux-persist](https://github.com/rt2zz/redux-persist) 6.0.0
- [react-router](https://reactrouter.com/) 6.0.1
- [axios](https://www.npmjs.com/package/axios) 0.24.0
- [node-sass](https://www.npmjs.com/package/node-sass) 6.0.1
- [react-hook-form](https://react-hook-form.com/) 7.19.1
- [react-query](https://react-query.tanstack.com/) 3.34.7
- [React-google-login](https://www.npmjs.com/package/react-google-login) 5.2.2
- [React-login-github](https://www.npmjs.com/package/react-login-github) 1.0.7
- [yup](https://www.npmjs.com/package/yup) 0.32.11
- [react-dropzone](https://react-dropzone.js.org/) 11.5.3
- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) 1.0.17
- [Material UI](https://mui.com/) ^5.2
- [moment](https://momentjs.com/) 2.29.1

## Getting started

### Try Instakilogram online

You can try the Instakilogram at this link: <https://dan-ch.github.io/InstakilogramUi/>  
First you need to register as a new user. You can use the standard form(no email verification needed) or sign in with Google or GitHub  
`Note: If you chose standard form password should have 8 characters, 1 lower and 1 upper case letter, 1 special character and 1 digit.`  
After registration your "wall" will be empty. Go to the search page, find some profile and follow. Seach for: `Andrea, Patrizio` or `Eustachio`

![search page](https://res.cloudinary.com/dsgz1rsiu/image/upload/v1645310900/Github%20docs/insta3_rswutx.png)

### Prerequisites

- npm 8.1.2
- node 16.13.1
- API from <https://github.com/dan-ch/InstakilogramApi>

### Installation

1. Clone repository

    ```txt
    git clone https://github.com/dan-ch/InstakilogramUi
    ```

2. Install requierd packages using npm:

    ```txt
    npm install
    ```

3. Provide valid enviroment variables in [.env](/.env) file:

    ```env
    REACT_APP_API_URL=https://instakilogram-api.herokuapp.com/api
    REACT_APP_GITHUB_CLIENT_ID=you_github_client_id
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    ```

   You can also use API that is deployed on Heroku at this link <https://instakilogram-api.herokuapp.com/api>

## Usage

To run the application simply paste and run the following command in your CLI

```txt
    npm start
```

## License

Distributed under the MIT License. See `LICENSE.txt`
