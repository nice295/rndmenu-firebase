'use strict';

const functions = require('firebase-functions');
const express = require("express");
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const ua = require('universal-analytics');
const admin = require('firebase-admin');

const message = require('./messages');
// const getRecomm_1Lunch = require('./recommendedMenu1Lunch');
const setMenu1Lunch = require('./setMenu1Lunch');
const utils = require('./utils');
const botService = require('./botService');

const app = express();
const visitor = ua('UA-51117181-7');

var serviceAccount = require("./rndmenu-firebase-adminsdk-39wi2-2f5c89e874.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rndmenu-v2.firebaseio.com"
});

const checkUserKey = (req, res, next) => {
  if (req.body.user_key !== undefined) {
    next();
  } else {
    res.status(500).send({
      error: 'user_key is undefined'
    });
  }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('<h1>Hello, You have wrong page view.</h1>');
});

app.get('/test', (req, res) => {
  res.send(utils.getDay());
});

app.get('/keyboard', (req, res) => {
  visitor.pageview("/").send();
  visitor.event("keyboard", "keyboard", req.body.user_key, 0).send();

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message.buttonsType()));
});

app.post('/message', checkUserKey, (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  botService.choseMenu(req, _obj.content, (err, result) => {
    if (!err) {
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(result));
    } else {
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(message.baseType('다시 시도해 주세요')));
    }
  });
});

app.post('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({
    success: true
  }));
});

app.delete('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({
    success: true
  }));
});

app.delete('/friend/test', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({
    success: true
  }));
});

app.delete('/chat_room/:user_key', checkUserKey, (req, res) => {
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({
    success: true
  }));
});

exports.app = functions.https.onRequest(app);