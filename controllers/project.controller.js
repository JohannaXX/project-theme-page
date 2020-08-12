const Project = require("../models/project.model")

module.exports.showNewProjectForm = (req, res, next) => {
    res.render('projects/newproject')
}

module.exports.showMainProjectList = (req, res) => { 
    Project.find()
        .populate('user')
        .populate('comments')
        .populate('likes')
        .then( projects => {
            res.render('index', { projects }) 
        })
}

module.exports.viewProject = (req, res) => {
    const projectId = req.params.projectid;
    Project.findById( projectId )
        .populate('user')
        .populate({
            path: 'comments',
            populate: { path: 'user' }
        })
        .populate('likes')
        .then( project => {
            res.render('projects/project', { project })
        })
}

module.exports.like = (req, res, next) => {

    res.send(req.params);
    /* const params = { user: req.currentUser._id, project: req.params.id  };

    Like.findOne(params)
      .then(like => {
        if (like) {
          Like.findByIdAndRemove(like._id)
            .then(() => {
              res.json({ like: -1 });
            })
            .catch(next);
        } else {
          const newLike = new Like(params);
          newLike.save()
            .then(() => {
              res.json({ like: 1 });
            })
            .catch(next);
        }
      })
      .catch(next); */
  }