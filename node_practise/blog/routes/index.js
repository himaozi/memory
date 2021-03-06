var crypto = require('crypto')
User = require('../models/user.js'), Post = require('../models/post.js');
var express = require('express');

/* GET home page. */
module.exports = function(app) {
  app.get('/', function(req, res) {
    Post.get(null, function(err, posts) {
      if (err) {
        posts = [];
      }
      res.render('index', {
        title: '主页',
        user: req.session.user,
        posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
  app.get('/reg', checkNotLogin);
  app.get('/reg', function(req, res) {
    res.render('reg', {
      title: '注册',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/reg', checkNotLogin);
  app.post('/reg', function(req, res) {
    var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
    //检验两次密码是否一致
    if (password_re != password) {
      req.flash('err', '两次输入密码不一致!');
      return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: req.body.name,
      password: password,
      email: req.body.email
    });
    //检查用户名是不是存在
    User.get(newUser.name, function(err, user) {
      if (err) {
        req.flash('error', err);
        returnres.redirect('/');
      }
      if (user) {
        req.flash('error', '用户名已存在');
        return res.redirect('/reg');
      }
      //新建用户
      newUser.save(function(err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = user; //用户信息存session
        req.flash('success', '注册成功');
        res.redirect('/'); //注册成功返回首页。
      });
    });
  });
  app.get('/login', checkNotLogin);
  app.get('/login', function(req, res) {
    res.render('login', {
      title: '登录',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/login', checkNotLogin);
  app.post('/login', function(req, res) {
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    User.get(req.body.name, function(err, user) {
      if (!user) {
        req.flash('error', '用户不存在!');
        return res.redirect('/login');
      }
      if (user.password != password) {
        req.flash('error', '密码错误!');
        return res.redirect('/login');
      }
      req.session.user = user;
      req.flash('success', '登陆成功!');
      res.redirect('/');
    });
  });
  app.get('/post', function(req, res) {
    res.render('post', {
      title: '发表',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/post', checkLogin);
  app.post('/post', function(req, res) {
    var currentUser = req.session.user,
      post = new Post(currentUser.name, req.body.title, req.body.post);
    post.save(function(err) {
      if (err) {
        console.log(11)
        req.flash('error', err);
        return res.redirect('/');
      }
      console.log(22)
      req.flash('success', '发布成功!');
      res.redirect('/'); //发表成功跳转到主页
    });
  });
  app.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/'); //登出成功后跳转到主页
  });


  function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!');
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!');
      res.redirect('back');
    }
    next();
  }
};

// module.exports = router;