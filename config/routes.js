const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const sessionMiddleware = require('../middlewares/session.middleware');
const upload = require('../config/multer.config');

const passport = require('passport');

router.get('/about', (req, res) => res.render('about') );
router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.showSignupPage); 
router.post('/signup', sessionMiddleware.isNotAuthenticated, upload.single('avatar'), usersController.createUser);
router.get('/activate/:token', sessionMiddleware.isNotAuthenticated, usersController.activateUser);
router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.showLoginPage);
router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);
router.get('/auth/slack', sessionMiddleware.isNotAuthenticated, usersController.loginWithSlack);
router.get('/auth/google', sessionMiddleware.isNotAuthenticated, usersController.loginWithGmail);
router.get('/auth/google/callback', sessionMiddleware.isNotAuthenticated, usersController.getLoginWithGmail);
router.get('/logout', sessionMiddleware.isAuthenticated, usersController.logout);

router.get('/user/:id', sessionMiddleware.isAuthenticated, usersController.showUserProfilePage);
router.get('/user/:id/edit', sessionMiddleware.isAuthenticated, usersController.showEditProfile);
router.post('/user/:id/edit', sessionMiddleware.isAuthenticated, upload.single('avatar'), usersController.updateProfile);
router.get('/user/:id/delete', sessionMiddleware.isAuthenticated, usersController.deleteProfile);

router.get('/projects', sessionMiddleware.isAuthenticated, projectController.showMainProjectList)
router.get('/newproject', sessionMiddleware.isAuthenticated, projectController.showNewProjectForm);
router.post('/newproject', sessionMiddleware.isAuthenticated, upload.single('image'), projectController.createNewProject);

router.get('/project/:id', projectController.viewProject);
router.get('/project/:id/edit', sessionMiddleware.isAuthenticated, projectController.showEditProject);
router.post('/project/:id/edit', sessionMiddleware.isAuthenticated, upload.single('image'), projectController.updateProject);
router.get('/project/:id/delete', sessionMiddleware.isAuthenticated, projectController.deleteProject);
router.get('/project/:id/like', projectController.like);

router.post('/newcomment/:project', sessionMiddleware.isAuthenticated, commentController.createComment);
router.get('/comment/:id', sessionMiddleware.isAuthenticated, commentController.showCommentDetail);
router.post('/comment/:id/edit', sessionMiddleware.isAuthenticated, commentController.updateComment);
router.get('/comment/:id/:project/delete', sessionMiddleware.isAuthenticated, commentController.deleteComment);

router.get('/', sessionMiddleware.isNotAuthenticated, projectController.showMainProjectList);

module.exports = router;


