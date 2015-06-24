# Memamug

An open-source app which helps you remember people you'd normally forget. See the live version at [memamug.com](http://www.memamug.com).

This app was built to demonstrate how to write a simple web-app, without resorting to a cliché to-do list. I'll be writing a number of tutorials to explain how to build this app, from creating the initial directory structure to deploying it live. Follow [@james_k_nelson](https://twitter.com/james_k_nelson) to keep updated. 

## Getting Started

*If you haven't already, install and start [memamug-server](https://github.com/jamesknelson/memamug-server)*

Once you have the server installed, getting started only takes four lines in your favorite terminal app:

```
git clone git@github.com:jamesknelson/memamug-client.git
cd memamug-client
npm install
npm install -g gulp
```

And then one final line each time you want to start the dev server, which watches for changes and makes the app available at http://localhost:9000/:

```
npm start
```

## Deployment

Want to deploy to a server to show your friends? Run `gulp dist` to produce a deployment-ready copy in the `dist` directory.
