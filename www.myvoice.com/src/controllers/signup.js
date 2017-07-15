const express = require('express');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/email', this.email);
    router.get('/password', this.password);

    return router;
  },
  index(req, res){
    res.render('signup');
  },
  email(req, res){
    res.render('signup/email');
  },
  password(req, res){
    res.render('signup/password');
  },
};