require('../config/db.config');

const User = require('../models/user.model');
const Project = require('../models/project.model');
const Comment = require('../models/comment.model');
const Like = require('../models/like.model');
const faker = require('faker');

const userIds = [];

Promise.all([
    User.deleteMany(),
    Project.deleteMany(),
    Comment.deleteMany()
])
    .then(() => {
        console.log('Database deleted!')

        for (let i = 0; i < 30; i++) {
            const user = new User({
                name: faker.name.findName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
                bio: faker.lorem.sentence(),
                createdAt: faker.date.past(),
            });

            user.save()
                .then(user => {
                    userIds.push(user._id);

                    const project = new Project({
                        user: user._id,
                        title: faker.lorem.words() + ' ' + Math.floor(Math.random() * 3),
                        body: faker.lorem.paragraphs(),
                        image: faker.image.technics(),
                        createdAt: faker.date.past(),
                    });

                    project.save()
                        .then(p => {

                            for (let j = 0; Math.floor(Math.random() * 10); j++) {
                                const comments = new Comment({
                                    user: userIds[Math.floor(Math.random() * userIds.length)],
                                    project: p._id,
                                    text: faker.lorem.text(),
                                    createdAt: faker.date.past(),
                                });

                                comments.save();
                            }

                            for (let k = 0; Math.floor(Math.random() * 50); k++) {
                                const likes = new Like({
                                    user: userIds[Math.floor(Math.random() * userIds.length)],
                                    project: p._id,
                                    createdAt: faker.date.past(),
                                });
        
                                likes.save();
                            }
                        })
                        .catch(err => next(err));
                
                })
                .catch(err => next(err));
                
        }
    })

