const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 8080;
const mapping = readConfig();
console.log('Loaded Mapping:');
console.log(mapping);

app.use(morgan('combined'));
app.get('/:key', respond);
app.get('/', index);
app.listen(port, () => console.log(`Listening on ${port}`));

function index(req, res) {
  res.end('Hello');
}

function respond(req, res) {
  const key = req.params.key;
  const to = mapping[key];

  if ( to ) {
    res.redirect(to);
  } else {
    res.status(404).end('Not found');
  }
}

function readConfig() {
  const dir = process.env.CONFIG || './config/';
  const paths = walk(dir);
  const out = {};

  for ( const key of paths ) {
    const name = key.split('/').slice(1).join('/');
    const value = fs.readFileSync(key).toString('utf8').trim();
    out[name] = value;
  }

  return out;
}

function walk(dir, root=false) {
  let files = fs.readdirSync(dir);

  files = files.map(file => {
    if ( file.startsWith('.') ) {
      return null;
    }

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if ( stats.isDirectory() ) {
      return walk(filePath);
    } else if ( stats.isFile() ) {
      return filePath;
    }
  });

  return files.filter(x => !!x).reduce((all, folderContents) => all.concat(folderContents), []);
}

