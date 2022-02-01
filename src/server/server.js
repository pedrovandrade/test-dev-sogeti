import express from 'express';
import path from 'path';
import React from 'react';
import ExpressReactViews from 'express-react-views';
import App from '../components/App';

const server = express();
server.use(express.static('dist'));
const port = process.env.PORT || 4000;
const root = path.join(__dirname, '..', '..');

server.set('views', path.join(root, 'src', 'views'));
server.set('view engine', 'jsx');
server.engine('jsx', ExpressReactViews.createEngine());

server.use(express.static('dist'));
server.use('/public', express.static(path.join(root, 'public')));
server.use('/style', express.static(path.join(root, 'public', 'style')));
server.use('/images', express.static(path.join(root, 'public', 'images')));

server.get('/', (req, res) => {
  res.render('index', { title: 'Test Sogeti', app: <App /> });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
