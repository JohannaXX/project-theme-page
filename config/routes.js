const express = require('express');
const router = express.Router();
const multer = require('multer');
const projectController = require('../controllers/project.controller')
const usersController = require('../controllers/user.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = require('../config/multer.config');

const passport = require('passport');

router.get('/about', (req, res) => res.render('about') );
router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.showSignupPage);
router.get('/login', /* sessionMiddleware.isNotAuthenticated,  */usersController.showLoginPage);
router.get('/auth/slack', sessionMiddleware.isNotAuthenticated, usersController.loginWithSlack);
router.get('/auth/google', sessionMiddleware.isNotAuthenticated, usersController.loginWithGmail);
router.get('/auth/google/callback', sessionMiddleware.isNotAuthenticated, usersController.getLoginWithGmail);
router.get('/logout', sessionMiddleware.isAuthenticated, usersController.logout);
// router.get('/profile/:id')

//AUTHORIZED:
router.get('/newproject', projectController.showNewProjectForm);

router.get('/project/:projectid/like', projectController.like);
router.get('/project/:projectid', projectController.viewProject);

router.get('/', projectController.showMainProjectList);

module.exports = router;


