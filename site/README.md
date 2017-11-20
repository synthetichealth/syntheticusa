# SyntheticUSA Front End

This is the prototype front end website for SyntheticUSA.  It is built using [React](http://reactjs.org), as well as other open source Javascript tools.

## Build Instructions

### Install Dependencis

From the `site/` directory:

```bash
$ npm install
```

### Running locally in development mode
```bash
$ npm start
```

The site will be available at ```http://localhost:3000/```

### Building for production
To prepare the site for deployment to the production server, you need to build the site in production mode.

```bash
$ npm run build
```

### Deploying the site

All files necessary for the production site are located in the `build` directory. Copy those files to the `DocumentRoot` of the server.
