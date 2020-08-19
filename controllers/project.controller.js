const Project = require("../models/project.model");
const User = require("../models/user.model");

module.exports.showNewProjectForm = (req, res, next) => {
    res.render('projects/projectform')
}

module.exports.showMainProjectList = (req, res) => { 
    Project.find()
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('comments')
      .populate('likes')
      .then( projects => {
          res.render('index', { projects }) 
      })
}

module.exports.createNewProject = (req, res, next) => {
  const projectParams = req.body;
  projectParams.user = req.currentUser;
  projectParams.image = req.file ? req.file.path : undefined;

  console.log(projectParams);
  
  const project = new Project(projectParams);


  project.save()
    .then(() => {
      res.redirect('/projects');
    })
    .catch(err => next(err));
}

module.exports.viewProject = (req, res, next) => {
  const { id } = req.params;
  Project.findById( id )
    .populate('user')
    .populate({
        path: 'comments',
        populate: { path: 'user' }
    })
    .populate('likes')
    .then( project => {

      User.findById(req.session.userId)
        .then((user) => {
          if (user && user._id.toString() === project.user.id) {
            res.render('projects/project', { project , user })
          } else {
            res.render('projects/project', { project })
          }
          
        })
        .catch(err => next(err));

    })
}

module.exports.showEditProject = (req, res, next) => {
  const { id } = req.params;
  Project.findById( id )
      .then( project => {
        res.render('projects/projectform', { project })
      })
      .catch(err => next(err));
}

module.exports.updateProject = (req, res, next) => {
  const { id } = req.params;
  Project.findById( id )
      .populate('user')
      .then( project => {

        if(project.user.id === req.currentUser.id) {
          const projectParams = req.body;

          if( req.file ) {
            projectParams.image = req.file.path;
          }
        
          Project.findByIdAndUpdate(req.params.id, projectParams, { runValidators: true, new: true })
            .then(project => {
                if (project) {
                    console.log('updated Project: ', project);
                    res.redirect(`/project/${project._id}`)
                } else {
                    res.redirect('/projects')
                }
            })
            .catch(err => next(err))
        } else {
          res.redirect(`/project/${project._id}`, { message: 'Could not update the project' })
        }
      })
      .catch(err => next(err));
  
}

module.exports.deleteProject = (req, res, next) => {
  const { id } = req.params;
  Project.findById( id )
      .populate('user')
      .then( project => {

        if(project.user.id === req.currentUser.id) {
          Project.findByIdAndRemove( id )
            .then(() => {
              res.redirect('/projects')
            })
            .catch(err => next(err));
        } else {
          res.redirect(`/project/${project._id}`, { message: 'Could not delete the project' })
        }
      })
      .catch(err => next(err));
}


module.exports.like = (req, res, next) => {
  res.send(req.params);
  
  const params = { user: req.currentUser._id, project: req.params.id  };

  Like.findOne(params)
    .then(like => {
      if (like) {
        Like.findByIdAndRemove(like._id)
          .then(() => {
            res.json({ like: -1 });
          })
          .catch(err => next(err));
      } else {
        const newLike = new Like(params);
        newLike.save()
          .then(() => {
            res.json({ like: 1 });
          })
          .catch(err => next(err));;
      }
    })
    .catch(err => next(err));
}