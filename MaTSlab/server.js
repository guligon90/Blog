const express = require('express');
const fs = require('fs');
const path = require('path');

const baseDir = pathToJoin => path.join(__dirname, pathToJoin || '');
const publicDir = pathToJoin => baseDir(`public/${pathToJoin}`);
const buildDir = pathToJoin => baseDir(`dist/${pathToJoin}`);
const jsFile = name => fs.readFileSync(buildDir(name)).toString();

const serveJS = () => (req, res) => {
  res.setHeader('content-type', 'application/javascript');

  return res.send(jsFile(req.url));
};

const serveHTML = () => (req, res) => {
  return res.send(fs.readFileSync(publicDir('index.html')).toString());
};

const createApp = app => {
  app.get('*.js', serveJS());
  app.get('/', serveHTML());
};

const runApp = app =>
  new Promise((resolve, reject) => {
    const server = app.listen(3000, '0.0.0.0');
    server.on('error', reject);
  });

(() => {
  const app = express();

  createApp(app);
  runApp(app);
})();
