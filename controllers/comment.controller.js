const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

module.exports.createComment = (req, res, next) => {
    const project = req.params.project;
    const params = {
        text: req.body.comment,
        user: req.currentUser.id,
        project
    }

    const comment = new Comment( params )

    comment.save()
        .then(() => {
            res.redirect(`/project/${project}`)
        })
        .catch(err => next(err));

}

module.exports.showCommentDetail = (req, res, next) => {
    const { id } = req.params;

    Comment.findById( id )
        .populate('user')
        .populate('project')
        .then(comment => {
            if(comment.user.id === req.currentUser.id) {
                const user = comment.user;
                res.render('comments/comment', { comment , user });
            } else {
                res.render('comments/comment', { comment });
            }
        })
        .catch(err => next(err));
}

module.exports.updateComment = (req, res, next) => {
    const { id } = req.params;
    const params = req.body;

    Comment.findById( id )
        .populate('user')
        .populate('project')
        .then(comment => {
            if(comment.user.id === req.currentUser.id) {
                Comment.findByIdAndUpdate(id, params, { runValidators: true, new: true })
                    .then(()=> {
                        res.redirect(`/project/${comment.project._id}`)
                    })
                    .catch(err => next(err));

            } else {
                res.redirect(`/project/${comment.project._id}`)
            }
        })
        .catch(err => next(err));
}

module.exports.deleteComment = (req, res, next) => {
    const { id, project } = req.params;

    Comment.findById( id )
        .populate('user')
        .then( comment => {

            if(comment.user.id === req.currentUser.id) {
                Comment.findByIdAndRemove( id )
                    .then(() => {
                        res.redirect(`/project/${project}`)
                    })
                    .catch(err => next(err));
            } else {
                res.redirect(`/project/${project}`)
            }
        })
        .catch(err => next(err));
}


