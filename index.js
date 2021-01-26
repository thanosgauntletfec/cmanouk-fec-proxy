const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const SCORES_API_URL = 'http://localhost:3010';
const SCHEDULE_API_URL = 'http://localhost:2080';
const IMAGES_API_URL = 'http://localhost:3080';

app.use(express.static('public'));

app.use('/scores', createProxyMiddleware({
  target: SCORES_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/scores': '/'
  }
}));

app.use('/schedule', createProxyMiddleware({
  target: SCHEDULE_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/schedule': '/'
  }
}));

app.use('/images', createProxyMiddleware({
  target: IMAGES_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/images': '/'
  }
}));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`)
});