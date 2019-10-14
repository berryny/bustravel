# Bus to Montreal for the Osheaga festival!

## Text Editor

[Atom](https://atom.io/)

## Pre-installation

Check if the following are installed
```
node --version
npm --version
git --version
```

## Setup
```
sudo npm install -g create-react-app
create-react-app coding-challenge-frontend-b
cd coding-challenge-frontend-b
sudo npm install react-router-dom
sudo npm install jquery --save
sudo npm install react-bootstrap bootstrap --save
npm install
```

## Getting Started on Heroku with Node.js

To quickly setup into `/usr/local/lib/heroku` and `/usr/local/bin/heroku`, run this script (script requires sudo and not Windows compatible):

```
sudo curl https://cli-assets.heroku.com/install.sh | sh
heroku --version
heroku login
cd coding-challenge-frontend-b
heroku create
git remote -v
heroku git:remote -a young-waters-80648
```

### Error message
````
remote:
To https://git.heroku.com/young-waters-80648.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/young-waters-80648.git'
````

Use `heroku logs` to view Activity Feed > Build Log
```
-----> Node.js app detected
-----> Build failed
 !     Two different lockfiles found: package-lock.json and yarn.lock
       Both npm and yarn have created lockfiles for this application,
       but only one can be used to install dependencies. Installing
       dependencies using the wrong package manager can result in missing
       packages or subtle bugs in production.
       - To use npm to install your application's dependencies please delete
         the yarn.lock file.
         $ git rm yarn.lock
       - To use yarn to install your application's dependences please delete
         the package-lock.json file.
         $ git rm package-lock.json

       https://help.heroku.com/0KU2EM53
 !     Push rejected, failed to compile Node.js app.
 !     Push failed
```

### Fix

```
sudo git rm yarn.lock
sudo git rm package-lock.json
git add .
git commit -m "react-create-app on Heroku"
```

In Atom, push files to master
- Stage All
- Add Commit message
  - Click commit message button
- Click Push (1)
- Once files are pushed, type the command line
```
git push heroku master
```

[Read more](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
