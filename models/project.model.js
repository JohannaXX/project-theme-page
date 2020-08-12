const mongoose = require("mongoose");

require('./user.model');
require('./comment.model');
require('./like.model');


const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
        type: String,
        required: [true, "A unique title is required"],
        unique: true
    },
    body: {
      type: String,
      required: [true, "A project description is required"]
    },
    image: {
      type: String,
      required: [false, "Only .jpg and .png format is allowed."]
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

projectSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'project',
  justOne: false,
});

projectSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'project',
  justOne: false
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;